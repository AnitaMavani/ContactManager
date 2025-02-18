import React, { useState, useEffect, useContext } from "react";
import { Box, TextField, Container, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import FormManager from "./FormManager";
import Validation from "./Validation";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { AuthContext } from './AuthContext';

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const initialState = { name: "", email: "", message: "" };
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formState, setFormState] = useState<Contact>({ id: 0, ...initialState });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const { isLoggedIn } = useContext(AuthContext);

  const { inputs, errors, handleChange, validate, resetForm, setInputs } = FormManager(initialState);

  // Fetch contacts from the backend on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('❌ Error fetching contacts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(Validation)) {
      try {
        if (isEditing && editId !== null) {
          // Update existing contact
          await axios.put(`http://localhost:5001/api/contacts/${editId}`, inputs);
          console.log("Contact updated:", inputs);
          setIsEditing(false);
        } else {
          // Add new contact
          const response = await axios.post('http://localhost:5001/api/contacts', inputs);
          console.log("Contact added:", response.data);
        }
        resetForm(initialState);
        fetchContacts(); // Refresh the contact list
      } catch (error) {
        console.error('❌ Error submitting contact:', error);
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5001/api/contacts/${id}`);
      console.log(`Record ${id} deleted`);
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error('❌ Error deleting contact:', error);
    }
  };

  const handleEdit = (id: number) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (contactToEdit) {
      setInputs(contactToEdit);
      setIsEditing(true);
      setEditId(id);
    }
    console.log(`Record ${id} editing`);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        maxWidth={600}
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        border={"1px solid #eee"}
      >
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            value={inputs.name}
            onChange={handleChange}
            label="Name"
            type={"text"}
            error={Boolean(errors.name)}
            helperText={errors.name}
            margin="dense"
            placeholder="Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            label="Email"
            type="email"
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin="dense"
            placeholder="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="message"
            value={inputs.message}
            onChange={handleChange}
            label="Message"
            multiline
            error={Boolean(errors.message)}
            helperText={errors.message}
            rows={4}
            margin="dense"
            placeholder="Message"
            fullWidth
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </form>
      </Box>
      { isLoggedIn && ( 
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Contact List</Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ListItemText
                primary={`${contact.name} (${contact.email})`}
                secondary={contact.message}
              />
              <IconButton aria-label="edit" onClick={() => handleEdit(contact.id)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDelete(contact.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      )}
    </Container>
  );
};

export default ContactForm;
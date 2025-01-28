import React, { useState } from "react";
import { Box, TextField, Container, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import FormManager from "./FormManager";
import Validation from "./Validation";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Contact = {
  id: number;
  name: String;
  email: string;
  message: String;
}

const ContactForm = () => {
  const initialState = { name: "", email: "", message: "" };
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formState, setFormState] = useState<Contact>({id:0, ...initialState});
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { inputs, errors, handleChange, validate, resetForm, setInputs } = FormManager(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("before validation");
    if (validate(Validation)) {
      console.log("validation inside");
      if (isEditing && editId !== null) {
        setContacts(contacts.map(contact => contact.id === editId ? { id: editId, ...inputs } as Contact : contact));
        console.log("set contacts");
        setIsEditing(false);
        console.log("is editing false")
        setEditId(null);
        console.log("Contact edited:", inputs);
      } else {
        //const newContact: Contact = { id: contacts.length + 1, ...inputs };
        setContacts([...contacts, { id: contacts.length + 1, ...inputs } as Contact]);
        console.log("Contact added:", inputs);
      }
      
      resetForm(initialState);
    } else {
      console.log("Validation failed:", errors);
    }




  };

  const handleDelete = (id:number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    console.log(`record ${id} deleted`);
  }

  const handleEdit = (id:number) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    console.log(contactToEdit);
    if(contactToEdit) {
      setInputs(contactToEdit);
      setIsEditing(true);
      setEditId(id);
    }
    console.log(`record ${id} edited`);
  }

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
            <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
              {isEditing ? "Update" : "Submit"}
            </Button>
        </form>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Contact List</Typography>
        <List>
          {contacts.map((contact) => (
              <ListItem key={contact.id}>
                <ListItemText
                  primary={`${contact.name} (${contact.email})`}
                  secondary={contact.message}/>
                  <IconButton  aria-label="edit" onClick={() => handleEdit(contact.id)}>
                  <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(contact.id)}><DeleteIcon /></IconButton>
                  </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ContactForm;

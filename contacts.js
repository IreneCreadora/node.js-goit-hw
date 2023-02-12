const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const queryContact = contactsList.find(
      (contact) => contact.id === contactId
    );

    if (!queryContact) {
      return null;
    }
    return queryContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const queryIndex = contactsList.findIndex(
      (contact) => contact.id === contactId
    );
    const [removedContact] = contactsList.splice(queryIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactsList = await listContacts();

    const createdContact = {
      name,
      email,
      phone,
      id: uuidv4(),
    };

    contactsList.push(createdContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return createdContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

import { useDispatch, useSelector } from 'react-redux';
import { Contact } from '../Contact/Contact';
import { deleteContact } from '../../redux/contactsOps';
import { useEffect } from 'react';
import { fetchData } from '../../redux/contactsOps';
import { selectError, selectFilteredContacts, selectLoading } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const filter = useSelector(selectNameFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filterData = contacts.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {filterData.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

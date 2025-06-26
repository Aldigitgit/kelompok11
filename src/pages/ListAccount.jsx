import { useEffect, useState } from 'react';
import { supabase } from '../supabase.js'; 
import AccountForm from '../Components/AccountForm';

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);

  const fetchAccounts = async () => {
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setAccounts(data);
    }
  };

  const addAccount = async (account) => {
    const { error } = await supabase.from('account').insert(account);
    if (error) {
      console.error(error);
    } else {
      fetchAccounts();
    }
  };

  const updateAccount = async (account) => {
    if (!account?.id) return;
    const { error } = await supabase
      .from('account')
      .update(account)
      .eq('id', account.id);

    if (error) {
      console.error(error);
    } else {
      fetchAccounts();
      setEditingAccount(null);
    }
  };

  const deleteAccount = async (id) => {
    const { error } = await supabase
      .from('account')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      fetchAccounts();
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Pengguna dengan Supabase</h1>
      <AccountForm
        addAccount={addAccount}
        updateAccount={updateAccount}
        editingAccount={editingAccount}
      />
      <ul className="mt-4">
        {accounts.map(account => (
          <li key={account.id} className="border p-2 my-2 flex justify-between">
            <div>
              <p className="font-semibold">{account.name}</p>
              <p className="text-sm text-gray-600">{account.email}</p>
              <p className="text-sm text-gray-600">{account.segmentation}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingAccount(account)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAccount(account.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Account;

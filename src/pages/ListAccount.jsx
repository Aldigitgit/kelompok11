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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CRUD Pengguna dengan Supabase</h1>
      <AccountForm
        addAccount={addAccount}
        updateAccount={updateAccount}
        editingAccount={editingAccount}
      />

      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Nama</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="border p-2">{account.name}</td>
                <td className="border p-2">{account.email}</td>
                <td className="border p-2">{account.role || '-'}</td>
                <td className="border p-2 space-x-2">
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
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">Tidak ada data akun.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Account;

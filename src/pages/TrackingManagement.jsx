import { useState, useMemo } from 'react';
import { BarChart2, CheckCircle, Clock, Filter, Truck, Package, XCircle, MoreHorizontal } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialOrders = [
  {
    id: 'INV/20230804/MPL/3363696046',
    warehouse: 'Shop Location',
    totalAmount: 'Rp. 51.000,00',
    buyerName: 'Dhoni Al Amin',
    awbBookingCode: 'AnterAja - YES',
    status: 'Payment verified, order ready',
    storeName: 'Defli Official Store',
    time: '04 Aug 2023 12:55 PM',
    paymentDate: '04 Aug 2023 12:55 PM',
    acceptDeadline: '07 Aug 2023 12:55 PM',
    confirmShippingDeadline: '08 Aug 2023 12:55 PM',
    exportBy: '',
    shippingAgency: 'AnterAja',
  },
  {
    id: 'INV/20230804/MPL/3363696222',
    warehouse: 'Shop Location',
    totalAmount: 'Rp. 67.100,00',
    buyerName: 'Wicahyo',
    awbBookingCode: 'GoSend - YES',
    status: 'Payment verified, order ready',
    storeName: 'Philips Lighting - Surabaya',
    time: '04 Aug 2023 12:53 PM',
    paymentDate: '04 Aug 2023 12:53 PM',
    acceptDeadline: '07 Aug 2023 08:53 AM',
    confirmShippingDeadline: '08 Aug 2023 16:53 PM',
    exportBy: '',
    shippingAgency: 'GoSend',
  },
  {
    id: 'INV/20230804/MPL/3363695985',
    warehouse: 'Shop Location',
    totalAmount: 'Rp. 129.281,00',
    buyerName: 'Ambika',
    awbBookingCode: 'GoSend - YES',
    status: 'Ready for pickup',
    storeName: 'Defli Official Store',
    time: '04 Aug 2023 12:50 PM',
    paymentDate: '04 Aug 2023 12:50 PM',
    acceptDeadline: '07 Aug 2023 08:50 AM',
    confirmShippingDeadline: '08 Aug 2023 16:50 PM',
    exportBy: '',
    shippingAgency: 'GoSend',
  },
  {
    id: 'INV/20230805/MPL/3363700123',
    warehouse: 'Warehouse A',
    totalAmount: 'Rp. 85.000,00',
    buyerName: 'Siti Aminah',
    awbBookingCode: 'JNE - REG',
    status: 'Shipped',
    storeName: 'Bookworm Haven',
    time: '05 Aug 2023 10:00 AM',
    paymentDate: '05 Aug 2023 10:00 AM',
    acceptDeadline: '08 Aug 2023 10:00 AM',
    confirmShippingDeadline: '09 Aug 2023 10:00 AM',
    exportBy: 'Admin A',
    shippingAgency: 'JNE',
  },
  {
    id: 'INV/20230806/MPL/3363705432',
    warehouse: 'Shop Location',
    totalAmount: 'Rp. 42.500,00',
    buyerName: 'Budi Santoso',
    awbBookingCode: 'SiCepat - BEST',
    status: 'Payment pending',
    storeName: 'Pustaka Jaya',
    time: '06 Aug 2023 09:30 AM',
    paymentDate: '06 Aug 2023 09:30 AM',
    acceptDeadline: '09 Aug 2023 09:30 AM',
    confirmShippingDeadline: '10 Aug 2023 09:30 AM',
    exportBy: '',
    shippingAgency: 'SiCepat',
  },
  {
    id: 'INV/20230807/MPL/3363711011',
    warehouse: 'Warehouse B',
    totalAmount: 'Rp. 150.000,00',
    buyerName: 'Dewi Lestari',
    awbBookingCode: 'Tiki - ONS',
    status: 'Delivered',
    storeName: 'Periplus Online',
    time: '07 Aug 2023 11:45 AM',
    paymentDate: '07 Aug 2023 11:45 AM',
    acceptDeadline: '10 Aug 2023 11:45 AM',
    confirmShippingDeadline: '11 Aug 2023 11:45 AM',
    exportBy: 'Admin B',
    shippingAgency: 'Tiki',
  },
  {
    id: 'INV/20230808/MPL/3363718900',
    warehouse: 'Shop Location',
    totalAmount: 'Rp. 99.000,00',
    buyerName: 'Joko Widodo',
    awbBookingCode: 'AnterAja - YES',
    status: 'Cancelled',
    storeName: 'Book Depository',
    time: '08 Aug 2023 02:15 PM',
    paymentDate: '08 Aug 2023 02:15 PM',
    acceptDeadline: '11 Aug 2023 02:15 PM',
    confirmShippingDeadline: '12 Aug 2023 02:15 PM',
    exportBy: '',
    shippingAgency: 'AnterAja',
  },
];

const TrackingManagement = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [filterStore, setFilterStore] = useState('All');
  const [filterOrderStatus, setFilterOrderStatus] = useState('All');
  const [filterWarehouse, setFilterWarehouse] = useState('All');
  const [filterShippingAgency, setFilterShippingAgency] = useState('All');
  const [filterIsPrinted, setFilterIsPrinted] = useState('All');
  const [filterIsExport, setFilterIsExport] = useState('All');
  const [filterIsGeneratedERP, setFilterIsGeneratedERP] = useState('All');
  const [searchInvoice, setSearchInvoice] = useState('');

  const handleSelectOrder = (id) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((orderId) => orderId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    }
  };

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      // Apply all filters here
      const matchesPlatform = filterPlatform === 'All' || order.platform === filterPlatform; // Assuming 'platform' might be added later
      const matchesStore = filterStore === 'All' || order.storeName === filterStore;
      const matchesOrderStatus = filterOrderStatus === 'All' || order.status === filterOrderStatus;
      const matchesWarehouse = filterWarehouse === 'All' || order.warehouse === filterWarehouse;
      const matchesShippingAgency = filterShippingAgency === 'All' || order.shippingAgency === filterShippingAgency;
      const matchesIsPrinted = filterIsPrinted === 'All' || (filterIsPrinted === 'Yes' && order.isPrinted) || (filterIsPrinted === 'No' && !order.isPrinted); // Assuming 'isPrinted' might be added later
      const matchesIsExport = filterIsExport === 'All' || (filterIsExport === 'Yes' && order.exportBy !== '') || (filterIsExport === 'No' && order.exportBy === '');
      const matchesIsGeneratedERP = filterIsGeneratedERP === 'All' || (filterIsGeneratedERP === 'Yes' && order.isGeneratedERP) || (filterIsGeneratedERP === 'No' && !order.isGeneratedERP); // Assuming 'isGeneratedERP' might be added later
      const matchesInvoice = searchInvoice === '' || order.id.toLowerCase().includes(searchInvoice.toLowerCase());

      return (
        matchesPlatform &&
        matchesStore &&
        matchesOrderStatus &&
        matchesWarehouse &&
        matchesShippingAgency &&
        matchesIsPrinted &&
        matchesIsExport &&
        matchesIsGeneratedERP &&
        matchesInvoice
      );
    });
  }, [
    filterPlatform,
    filterStore,
    filterOrderStatus,
    filterWarehouse,
    filterShippingAgency,
    filterIsPrinted,
    filterIsExport,
    filterIsGeneratedERP,
    searchInvoice,
  ]);

  const countByStatus = (status) =>
    initialOrders.filter((o) => o.status === status).length;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Payment verified, order ready':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Ready for pickup':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'Shipped':
        return <Truck className="w-4 h-4 text-purple-600" />;
      case 'Delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Payment pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-600" />;
    }
  };

  // Prepare data for the chart
  const statusCounts = useMemo(() => {
    const counts = {};
    initialOrders.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }, [initialOrders]);

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Jumlah Pesanan',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Payment verified, order ready, Delivered
          'rgba(54, 162, 235, 0.6)', // Ready for pickup
          'rgba(153, 102, 255, 0.6)', // Shipped
          'rgba(255, 206, 86, 0.6)', // Payment pending
          'rgba(255, 99, 132, 0.6)', // Cancelled
          'rgba(201, 203, 207, 0.6)', // Others
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistik Pesanan Berdasarkan Status',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Pesanan',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Status Pesanan',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Tracking Pesanan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label htmlFor="platform" className="text-sm font-medium text-gray-700 mb-1">Choose Platform</label>
            <select
              id="platform"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
            >
              <option value="All">Select Platform</option>
              {/* Add dynamic options if platforms are known */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="store" className="text-sm font-medium text-gray-700 mb-1">Choose Store</label>
            <select
              id="store"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterStore}
              onChange={(e) => setFilterStore(e.target.value)}
            >
              <option value="All">Select Store</option>
              {Array.from(new Set(initialOrders.map(o => o.storeName))).map(store => (
                <option key={store} value={store}>{store}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="orderStatus" className="text-sm font-medium text-gray-700 mb-1">Order Status</label>
            <select
              id="orderStatus"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterOrderStatus}
              onChange={(e) => setFilterOrderStatus(e.target.value)}
            >
              <option value="All">All</option>
              {Array.from(new Set(initialOrders.map(o => o.status))).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="warehouse" className="text-sm font-medium text-gray-700 mb-1">Warehouse</label>
            <select
              id="warehouse"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterWarehouse}
              onChange={(e) => setFilterWarehouse(e.target.value)}
            >
              <option value="All">All</option>
              {Array.from(new Set(initialOrders.map(o => o.warehouse))).map(warehouse => (
                <option key={warehouse} value={warehouse}>{warehouse}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="shippingAgency" className="text-sm font-medium text-gray-700 mb-1">Shipping Agency</label>
            <select
              id="shippingAgency"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterShippingAgency}
              onChange={(e) => setFilterShippingAgency(e.target.value)}
            >
              <option value="All">All</option>
              {Array.from(new Set(initialOrders.map(o => o.shippingAgency))).map(agency => (
                <option key={agency} value={agency}>{agency}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="isPrinted" className="text-sm font-medium text-gray-700 mb-1">Is Printed</label>
            <select
              id="isPrinted"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterIsPrinted}
              onChange={(e) => setFilterIsPrinted(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="isExport" className="text-sm font-medium text-gray-700 mb-1">Is Export</label>
            <select
              id="isExport"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterIsExport}
              onChange={(e) => setFilterIsExport(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="isGeneratedERP" className="text-sm font-medium text-gray-700 mb-1">Is Generated ERP?</label>
            <select
              id="isGeneratedERP"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterIsGeneratedERP}
              onChange={(e) => setFilterIsGeneratedERP(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col col-span-full md:col-span-2 lg:col-span-1">
            <label htmlFor="searchInvoice" className="text-sm font-medium text-gray-700 mb-1">Search by Invoice Number</label>
            <input
              type="text"
              id="searchInvoice"
              placeholder="Type Invoice Number..."
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchInvoice}
              onChange={(e) => setSearchInvoice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => { /* Apply Filter logic */ }}
          >
            Filter
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            onClick={() => {
              setFilterPlatform('All');
              setFilterStore('All');
              setFilterOrderStatus('All');
              setFilterWarehouse('All');
              setFilterShippingAgency('All');
              setFilterIsPrinted('All');
              setFilterIsExport('All');
              setFilterIsGeneratedERP('All');
              setSearchInvoice('');
              setSelectedOrders([]);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {selectedOrders.length} orders selected
          </div>
          <div className="flex space-x-2">
            <div className="relative group">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2">
                Change Status <MoreHorizontal className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Accept</button>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Request Pick Up</button>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Print All Shipping Label
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
              Synchronize
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAllOrders}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </th>
                <th className="border border-gray-200 px-3 py-2 text-left">ACTIONS</th>
                <th className="border border-gray-200 px-3 py-2 text-left">INVOICE NUMBER</th>
                <th className="border border-gray-200 px-3 py-2 text-left">WAREHOUSE</th>
                <th className="border border-gray-200 px-3 py-2 text-left">TOTAL AMOUNT</th>
                <th className="border border-gray-200 px-3 py-2 text-left">BUYER NAME</th>
                <th className="border border-gray-200 px-3 py-2 text-left">AWB / BOOKING CODE</th>
                <th className="border border-gray-200 px-3 py-2 text-left">STATUS</th>
                <th className="border border-gray-200 px-3 py-2 text-left">STORE NAME</th>
                <th className="border border-gray-200 px-3 py-2 text-left">TIME</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Payment Date</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Accept Deadline</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Confirm Shipping Deadline</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Export By</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="14" className="text-center py-4 text-gray-500">No orders found matching the criteria.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className={`${selectedOrders.includes(order.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2 text-center">
                      <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                    </td>
                    <td className="border border-gray-200 px-3 py-2 font-medium text-blue-600">{order.id}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.warehouse}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.totalAmount}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.buyerName}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.awbBookingCode}</td>
                    <td className="border border-gray-200 px-3 py-2">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)} {order.status}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-3 py-2">{order.storeName}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.time}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.paymentDate}</td>
                    <td className="border border-gray-200 px-3 py-2 text-red-600">{order.acceptDeadline}</td>
                    <td className="border border-gray-200 px-3 py-2 text-red-600">{order.confirmShippingDeadline}</td>
                    <td className="border border-gray-200 px-3 py-2">{order.exportBy || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Visual Statistik Pesanan</h2>
        <div className="h-80 w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TrackingManagement;
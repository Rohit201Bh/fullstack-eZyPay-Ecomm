import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Modal from 'react-modal'; 

const VITE_BACKEND_HOST_URL = `https://ezypay.onrender.com`;

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [fakeProducts, setFakeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/home');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_HOST_URL}/api/addproduct/read`);
        if (!response.ok) throw new Error('Failed to fetch custom products');
        const data = await response.json();
        setProducts(data.products);

        const fakeResponse = await fetch('https://fakestoreapi.com/products');
        if (!fakeResponse.ok) throw new Error('Failed to fetch fake products');
        const fakeData = await fakeResponse.json();
        setFakeProducts(fakeData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handlePayment = async (amount) => {
    const backendUrl = VITE_BACKEND_HOST_URL;
    const URL = `${backendUrl}/api/payment/order`;

    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Payment failed");

      const data = await res.json();
      console.log("Data is", data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: ({}).RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Gopal Dixit",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await fetch(`${({}).VITE_BACKEND_HOST_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });

          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.error(error);
        }
      },
      theme: { color: "#5f63b8" }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-1000 to-gray-900 text-white flex flex-col items-center py-8">
      {/* Navbar */}
      <div className="w-full flex justify-between items-start px-8 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">🛍️ eZyPay </h1>
        <button
          onClick={handleNavigate}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 mt-[-10px "
        >
          Logout
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-9">
        {[...products, ...fakeProducts].map((product) => (
          <Card
            key={product._id || product.id}
            className="bg-gray-800 text-white w-auto m-4 h-auto shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => openModal(product)}
          >
            <CardHeader color="blue-gray" className="h-56 flex justify-center items-center">
              <img src={product.image} alt={product.name || product.title} className="h-full w-auto object-contain" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" className="mb-2 font-bold text-lg">{product.name || product.title}</Typography>
              <Typography className="line-clamp-2 text-gray-300">{product.description}</Typography>
              <h1 className="font-bold text-xl mt-2">₹{product.price}</h1>
            </CardBody>
            <CardFooter className="pb-7 flex justify-center">
              <Button 
                onClick={() => handlePayment(product.price)}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-900 px-6 py-3 justify-center rounded-lg transition-all duration-300"
              >
                🛒 Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>


            {/* Modal for displaying product details */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <div className="p-9 bg-transparent text-white rounded-lg shadow-lg max-w-md mx-auto">
          {selectedProduct && (
            <div className="flex flex-col items-center text-center border border-gray-400 backdrop-blur-xl p-9 rounded-lg">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name || selectedProduct.title}
                className="h-56 w-auto object-contain mb-4 rounded-lg shadow-md"
              />
              <h2 className="text-xl font-bold text-white">{selectedProduct.name || selectedProduct.title}</h2>
              <p className="text-gray-800 mt-2 text-lg italic">{selectedProduct.description}</p>
              <h1 className="font-serif text-2xl mt-2 text-green-700">₹{selectedProduct.price}</h1>
              <Button 
                onClick={() => handlePayment(selectedProduct.price)}
                disabled={isLoading}
                className="bg-blue-500 bg-opacity-1000 hover:bg-blue-700 hover:bg-opacity-100 mt-4 px-6 py-2 rounded-lg transition-all duration-300 shadow-lg backdrop-blur-md"
              >
                ✅ Proceed to Buy
              </Button>
            </div>
          )}
          
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await API.get('/plans');
      setPlans(response.data);
    } catch (err) {
      setError('Failed to fetch plans. Please try again later.',err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId, planName) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await API.post(`/subscribe/${planId}`);
      alert(`Successfully subscribed to ${planName}!`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Subscription failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12 pt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan that works best for your needs. All plans include our core features with flexible options to scale.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto mb-8">
          {error}
        </div>
      )}

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan._id} 
            className={`bg-white rounded-xl shadow-lg border transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 ${
              plan.name === 'Pro' 
                ? 'border-blue-500 border-2 relative ring-4 ring-blue-100' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Popular Badge */}
            {plan.name === 'Pro' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className={`p-6 rounded-t-xl ${
              plan.name === 'Pro' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
            }`}>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="ml-2 text-lg opacity-90">
                  {plan.duration === 365 ? '/year' : '/month'}
                </span>
              </div>
              <p className="text-sm mt-2 opacity-90">
                {plan.duration === 365 ? 'Annual plan (save 20%)' : 'Billed monthly'}
              </p>
            </div>

            {/* Plan Features */}
            <div className="p-6">
              <ul className="space-y-4 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <svg 
                      className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        plan.name === 'Pro' ? 'text-blue-500' : 'text-green-500'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe(plan._id, plan.name)}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  plan.name === 'Pro' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
                }`}
              >
                {plan.name === 'Pro' ? 'Get Started ' : 'Subscribe Now'}
              </button>

              {/* Additional Info */}
              <p className="text-center text-xs text-gray-500 mt-4">
                {plan.duration === 365 ? 'Cancel anytime • 30-day money-back guarantee' : 'No long-term contract • Cancel anytime'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* All Plans Include Section */}
      <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          All Plans Include
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group hover:transform hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition duration-300">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Secure & Reliable</h4>
            <p className="text-gray-600">Enterprise-grade security with 99.9% uptime</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition duration-300">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">24/7 Support</h4>
            <p className="text-gray-600">Round-the-clock customer support via chat & email</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition duration-300">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Flexible</h4>
            <p className="text-gray-600">Upgrade, downgrade, or cancel anytime</p>
          </div>
        </div>
      </div>

      {/* No Plans Available */}
      {plans.length === 0 && !loading && (
        <div className="max-w-md mx-auto mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Plans Available</h3>
            <p className="text-gray-600 mb-4">Please check back later or contact support.</p>
            <button
              onClick={fetchPlans}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
            >
              Refresh Plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
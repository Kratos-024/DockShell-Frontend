/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FeatureSection } from '../components/FeatureSection';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { NavBar } from '../components/NavBar';
import { StatsSection } from '../components/StatsSection';
// // Simple test function to debug your API endpoint
// async function testApiCall() {
//   console.log('🚀 Starting API test...');

//   try {
//     const response = await fetch('https://d71c6496e17e.ngrok-free.app/api/v1/ctf/getCtf', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         // Add auth token if you have one stored
//         // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//       },
//     });

//     console.log('📊 Response Status:', response.status);
//     console.log('📋 Response Headers:', [...response.headers.entries()]);

//     if (response.ok) {
//       const data = await response.json();
//       console.log('✅ Success! Data received:');
//       console.log(JSON.stringify(data, null, 2));

//       // Additional checks
//       console.log('📈 Number of CTFs:', data.data?.length || 0);
//       console.log('💬 Message:', data.message);
//     } else {
//       console.log('❌ Request failed with status:', response.status);
//       const errorText = await response.text();
//       console.log('Error response:', errorText);
//     }
//   } catch (error) {
//     console.log('🔥 Fetch Error:');
//     console.error(error);

//     //@ts-ignore
//     if (error.name === 'TypeError' && error.message.includes('fetch')) {
//       console.log('🌐 This might be a network/CORS issue');
//     }
//   }
// }

// async function testApiCallWithAuth() {
//   console.log('🔐 Testing with auth token...');

//   const token = localStorage.getItem('authToken') || localStorage.getItem('token');

//   if (!token) {
//     console.log('⚠️ No auth token found in localStorage');
//     console.log('Available localStorage keys:', Object.keys(localStorage));
//     return;
//   }

//   console.log('🎫 Token found:', token.substring(0, 20) + '...');

//   try {
//     const response = await fetch('https://d71c6496e17e.ngrok-free.app/api/v1/ctf/getCtf', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//     });

//     console.log('📊 Auth Response Status:', response.status);

//     if (response.ok) {
//       const data = await response.json();
//       console.log('✅ Authenticated request successful!');
//       console.log(data);
//     } else {
//       console.log('❌ Auth request failed:', response.status);
//       const errorText = await response.text();
//       console.log('Error:', errorText);
//     }
//   } catch (error) {
//     console.log('🔥 Auth Fetch Error:', error);
//   }
// }

// // Run both tests
// console.log('='.repeat(50));
// console.log('🧪 API ENDPOINT TESTING');
// console.log('='.repeat(50));

// // Test without auth first
// testApiCall();

// // Wait a bit, then test with auth
// setTimeout(() => {
//   console.log('\n' + '='.repeat(30));
//   testApiCallWithAuth();
// }, 2000);
export const HomePage = ({
  isModalOpen,
  handleLoginClick,
}: {
  isModalOpen: boolean;
  handleLoginClick: () => void | undefined;
}) => {
  return (
    <div
      className=" bg-gradient-to-br
     from-background via-card to-background"
    >
      <NavBar
        isModalOpen={isModalOpen}
        handleLoginClick={handleLoginClick}
        menu={undefined}
        menuHandler={() => {
          return;
        }}
      />
      <HeroSection handleLoginClick={handleLoginClick} />
      <FeatureSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

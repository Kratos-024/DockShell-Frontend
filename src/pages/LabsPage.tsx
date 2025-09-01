import { useEffect, useState } from 'react';
import { CtfHero } from '../components/CtfHero';
import { Footer } from '../components/Footer';
import { LabSection } from '../components/LabSection';
import { NavBar } from '../components/NavBar';
import { Shield, Globe, Lock, AlertTriangle } from 'lucide-react';
import LevelServiceInstance from '../services/ctf.service';
import type LabInter from '../assets/types';
// Debug function to see what HTML you're actually getting
async function debugApiResponse() {
  console.log('🔍 Debugging API response...');

  try {
    const response = await fetch('https://d71c6496e17e.ngrok-free.app/api/v1/ctf/getCtf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    console.log('📊 Status:', response.status);
    console.log('📋 Content-Type:', response.headers.get('content-type'));
    console.log('🌐 URL:', response.url);

    // Get the raw text response first
    const rawText = await response.text();
    console.log('📄 Raw Response (first 500 chars):');
    console.log(rawText.substring(0, 500));

    // Check if it's HTML
    if (rawText.startsWith('<!DOCTYPE') || rawText.startsWith('<html')) {
      console.log('❌ PROBLEM: Getting HTML instead of JSON!');
      console.log('🔍 This usually means:');
      console.log('   1. Server error (500)');
      console.log('   2. Route not found (404)');
      console.log('   3. ngrok authentication page');
      console.log('   4. Server is down/restarting');

      // Try to extract error info from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawText, 'text/html');
      const title = doc.querySelector('title')?.textContent;
      console.log('📝 HTML page title:', title);
    } else {
      console.log('✅ Response is not HTML, trying to parse as JSON...');
      try {
        const jsonData = JSON.parse(rawText);
        console.log('✅ Valid JSON received:', jsonData);
      } catch (parseError) {
        console.log('❌ Not valid JSON either:', parseError);
      }
    }
  } catch (error) {
    console.error('🔥 Network Error:', error);
  }
}

// Also test if your server is responding at all
async function testServerHealth() {
  console.log('\n🏥 Testing server health...');

  try {
    const response = await fetch('https://d71c6496e17e.ngrok-free.app/', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    console.log('🏠 Root endpoint status:', response.status);

    if (response.ok) {
      const text = await response.text();
      console.log('🏠 Root response (first 200 chars):', text.substring(0, 200));
    }
  } catch (error) {
    console.log('💀 Server might be down:', error);
  }
}

// Run the debug
debugApiResponse();
setTimeout(testServerHealth, 1000);
export const CtfsPage = ({
  isModalOpen,
  handleLoginClick,
}: {
  isModalOpen: boolean;
  handleLoginClick: () => void | undefined;
}) => {
  const [labs, setLabs] = useState<LabInter[]>([
    {
      ctfName: '',
      totalLevels: 0,
      title: '',
      imgSrc: '',
      totalPlayers: 0,
      subHeader: '',
      difficulty: '',
      topic: 's',
    },
  ]);
  useEffect(() => {
    const getCtfHandler = async () => {
      try {
        const response = await LevelServiceInstance.getCtf();
        console.log(response);
        if ('data' in response) {
          console.log(response);
          setLabs(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.log('Error has been occured', error);
      }
    };
    getCtfHandler();
  }, []);
  return (
    <section
      className="bg-gradient-to-br
     from-background via-card to-background"
    >
      <NavBar isModalOpen={isModalOpen} handleLoginClick={handleLoginClick} />
      <div>
        {' '}
        <div className=" inset-0 opacity-10 -z-10">
          <Shield className="absolute top-20 left-10 h-12 w-12 text-primary animate-pulse" />
          <Lock className="absolute top-32 right-16 h-8 w-8 text-accent animate-pulse delay-1000" />
          <Globe className="absolute bottom-40 left-20 h-10 w-10 text-primary animate-pulse delay-500" />
          <AlertTriangle className="absolute bottom-20 right-12 h-6 w-6 text-accent animate-pulse delay-1500" />
        </div>
        <CtfHero />
        <LabSection labs={labs} header={'Labs'} />
      </div>{' '}
      <Footer />
    </section>
  );
};

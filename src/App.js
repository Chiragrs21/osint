import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Scan from './components/Scan';
import Newscan from './components/Newscan';
import Results from './components/Results';
import Data from './components/Data';
import { SharedStateProvider } from './statecontext/Usestatecontext';
import Sub_Domain from './sub-components/Sub_Domain';
import Info from './sub-components/Info';
import Data_ip from './components/Data_ip';
import Certificates from './sub-components/Certificates';
import Check_domain from './sub-components/Check_domain';
import Loginpage from './auth/Loginpage';
import Signuppage from './auth/Signuppage'
import Graph from './components/Graph';
import Data_email from './components/Data_email';
import Data2 from './components/Data2';
import Social_email from './components/Social_email';
import Email_verification from './components/Email_verification';
import Ip_ports from './components/Ip_ports';
import Data3 from './components/Data3';
import Domain_search from './components/Domain_search';
import Email_domain from './components/Email_domain';
import Graph2 from './components/Graph2';
import Document1 from './components/Document1';
import Document3 from './components/Document3';
import Document2 from './components/Document2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Phone from './components/Phone';


function App() {
  return (
    <>
      <SharedStateProvider>
        <ToastContainer />
        <Routes>

          <Route path='/signup' element={<Loginpage />} />
          <Route path='/login' element={<Signuppage />} />
          <Route path='/' element={<Home />} />
          <Route path='/scan' element={<Scan />} />
          <Route path='/newscan' element={<Newscan />} />
          <Route path='/results' element={<Results />} />
          <Route path='/data/:name' element={<Data />} />
          <Route path='/data2/:name' element={<Data2 />} />
          <Route path='/data3/:name' element={<Data3 />} />
          <Route path='/Graph/:name' element={<Graph />} />
          <Route path='/Graph2/:name' element={<Graph2 />} />
          <Route path='/links/:name' element={<Sub_Domain />} />
          <Route path='/Info/:name' element={<Info />} />
          <Route path='/doc/:name' element={<Document1 />} />
          <Route path='/doc2/:name' element={<Document3 />} />
          <Route path='/doc3/:name' element={<Document2 />} />
          <Route path='/domain_search/:name' element={<Domain_search />} />
          <Route path='/email/:name' element={<Data_email />} />
          <Route path='/social_mail/:name' element={<Social_email />} />
          <Route path='/email_verify/:name' element={<Email_verification />} />
          <Route path='/domain_email/:name' element={<Email_domain />} />
          <Route path='/ip_ports/:name' element={<Ip_ports />} />
          <Route path='/phone/:name' element={<Phone />} />
          <Route extact path='/data_ipv6/:name' element={<Data_ip />} />
          <Route extact path='/certificate/:name' element={<Certificates />} />
          <Route extact path='/check_domain/:name' element={<Check_domain />} />
        </Routes>
      </SharedStateProvider>
    </>
  );
}

export default App;

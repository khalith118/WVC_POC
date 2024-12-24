import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Index = lazy(() => import('./pages/Index'));
const Notfound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Account/Login'));
const MemberIndex = lazy(() => import('./pages/Members/Index'));
const Home = lazy(() => import('./pages/Members/Home'));



function App() {
  return (
    <Suspense fallback='Loading...'>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/members" element={<MemberIndex />}>
        <Route path="/members" element={<Home />} /> 
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

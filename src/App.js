import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components for initial load.
import Header from 'components/layout/Header';
import Stations from 'pages/Stations';

// Lazy load / code split routes
const Browse = lazy(() => import('pages/Browse'));
const Listen = lazy(() => import('pages/Listen'));
const History = lazy(() => import('pages/History'));

function App() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/' exact component={Stations} />
          <Route path='/browse' component={Browse} />
          <Route path='/listen' component={Listen} />
          <Route path='/history' component={History} />
        </Switch>
      </Suspense>
    </main>
  );
}

export default App;

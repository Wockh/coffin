import React from 'react';
import Builder from '../Builder';
import Footer from '../Footer';
import Output from '../Output';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Builder />
        <Output />
        <Footer />
      </main>
    );
  }
}

export default Main;

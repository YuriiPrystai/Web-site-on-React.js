import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Product from '../pages/product/product.component';
import Footer from '../componets/footer/footer.component';
import AboutUs from '../pages/about-us/about-us.component';
import Products from '../pages/products/products.component';
import ContactList from '../pages/contacts/contact.component';
import MainPage from '../pages/main-page/main-page.component';
import MainNav from '../componets/main-nav/main-nav.component';
import SignIn from '../pages/admin-pages/sign-in/sign-in.component';
import ScrollToTop from '../componets/scroll-to-top/scroll-to-top.component';
import AddProduct from '../pages/admin-pages/add-product/add-product.component';
// import ProtectedRoute from '../componets/protected-route/protected-route.component';
import DeleleProduct from '../pages/admin-pages/delete-product/delete-product.component';
import NotFound from '../componets/not-found/not-found.component';

const Test = () => <h2> us </h2>;

const Admin = () => (
  <Router basename="/admin">
    <ScrollToTop />
    <Switch>
      <Route path="/add-product" component={AddProduct} />
      <Route path="/delete-product" component={DeleleProduct} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

const App = () => {
  useEffect(() => {
    const disablecontext = (e) => {
      const clickedElement = (e === null) ? e.srcElement.tagName : e.target.tagName;
      if (clickedElement === "IMG") {
        return false;
      }
    }
    document.oncontextmenu = disablecontext;
  },[]);
  return(
    <Router>
      <MainNav />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/products" component={Products} />
        <Route path="/contacts" component={ContactList} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/aditional-price" component={Test} />
        <Route path="/customer-info" component={Test} />
        <Route path="/service-provider-info" component={Test} />
        <Route path="/admin" component={Admin} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  )
};

export default App;
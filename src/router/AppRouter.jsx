import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
import About from "../pages/About";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Detail from "../pages/Detail";
import Register from "../pages/Register";
import Login from "../pages/Login";



const AppRouter = () => {
  return (
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Dashboard />} />
    //     <Route path="new-blog" element={<NewBlog />} />
    //     <Route path="about" element={<About />} />
    //     <Route path="/detail/:_id" element={<Detail />} />

    //     <Route path="stock" element={<PrivateRouter />}>
    //       <Route path="" element={<Dashboard />}>
    //         <Route index element={<Home />} />
    //         <Route path="purchases" element={<Purchases />} />
    //         <Route path="sales" element={<Sales />} />
    //         <Route path="firms" element={<Firms />} />
    //         <Route path="brands" element={<Brands />} />
    //         <Route path="products" element={<Products />} />
    //       </Route>
    //     </Route>
    //   </Routes>
    //   <Footer />
    // </Router>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="new-blog" element={<NewBlog />} />
        <Route path="/detail/:_id" element={<Detail />} />

        {/* <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} /> */}
        {/* <Route path="purchases" element={<Purchases />} />
            <Route path="sales" element={<Sales />} />
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} /> */}
        {/* </Route>
        </Route> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;

import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { fetchProducts, fetchProductsByCategory } from './redux/feature/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state: any) => state.product)
  const[category, setCategory] = React.useState("")

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    dispatch(fetchProductsByCategory(selectedCategory));
  };
  // console.log(products)

  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
      <div>
          <NavBar />
          <main className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  Welcome to My Website
              </h1>
              <p className="text-lg text-slate-700 mb-6">
                  This is a simple React application with a clean and modern
                  design.
              </p>
          </main>

          <div>
              {loading && <p>Loading products...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {products && products.length > 0 && (
                  <div className="container mx-auto px-4 py-8">
                      <h2 className="text-center text-2xl font-bold text-slate-900 mb-6">
                          Products
                      </h2>
                      <select
                          value={category}
                          onChange={handleCategoryChange}
                          className="mb-4 p-2 border border-slate-300 rounded"
                      >
                          <option value="">All Categories</option>
                          <option value="electronics">Electronics</option>
                          <option value="jewelery">jewelery</option>
                          <option value="men's clothing">Men's Clothing</option>
                          <option value="women's clothing">
                              Women's Clothing
                          </option>
                      </select>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {products.map((product: any) => (
                              <div
                                  key={product.id}
                                  className="bg-white rounded-lg shadow-md p-4"
                              >
                                  <img
                                      src={product.image}
                                      alt={product.title}
                                      className="w-full h-48 object-cover mb-4"
                                  />
                                  <h3 className="text-lg font-semibold text-slate-900">
                                      {product.title}
                                  </h3>
                                  <p className="text-sm text-slate-700 mt-2">
                                      ${product.price}
                                  </p>
                                  <p className="text-sm text-slate-700 mt-2">
                                      {product.category}
                                  </p>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
          <Footer />
      </div>
  );
}

export default App

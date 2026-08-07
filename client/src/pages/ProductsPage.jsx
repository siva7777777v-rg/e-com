import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Gem } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProductsApi } from '../services/api';

const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Furniture'];
const genders = ['All', 'Men', 'Women', 'Kids', 'Unisex'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [gender, setGender] = useState(searchParams.get('gender') || 'All');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductsApi({
          category: category !== 'All' ? category : undefined,
          gender: gender !== 'All' ? gender : undefined,
          search: search || undefined,
          sort,
        });
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, gender, search, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ category, gender, search });
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.35rem' }}>
          <Gem size={20} color="#fbbf24" />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            LUMINA VAULT COLLECTION
          </span>
        </div>
        <h1 style={{ fontSize: '2.8rem', color: '#fff', fontFamily: "'Cinzel', serif" }}>Discover Lumina Catalog</h1>
      </div>

      {/* Filter & Controls Panel */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          
          {/* Search Bar */}
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <Search size={18} color="#fbbf24" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search Lumina pieces by title, description, acoustic drivers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ flex: '0 1 180px' }}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-input"
              style={{ background: 'rgba(7, 9, 14, 0.9)', cursor: 'pointer', color: '#fff' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ background: '#07090e', color: '#fff' }}>
                  {cat === 'All' ? 'All Collections' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter Dropdown */}
          <div style={{ flex: '0 1 160px' }}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="glass-input"
              style={{ background: 'rgba(7, 9, 14, 0.9)', cursor: 'pointer', color: '#fff' }}
            >
              {genders.map((g) => (
                <option key={g} value={g} style={{ background: '#07090e', color: '#fff' }}>
                  {g === 'All' ? 'All Genders' : g}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div style={{ flex: '0 1 180px' }}>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="glass-input"
              style={{ background: 'rgba(7, 9, 14, 0.9)', cursor: 'pointer', color: '#fff' }}
            >
              <option value="newest" style={{ background: '#07090e', color: '#fff' }}>Newest Vault Additions</option>
              <option value="price-low" style={{ background: '#07090e', color: '#fff' }}>Price: Low to High</option>
              <option value="price-high" style={{ background: '#07090e', color: '#fff' }}>Price: High to Low</option>
              <option value="rating" style={{ background: '#07090e', color: '#fff' }}>Highest Rated</option>
            </select>
          </div>

        </form>
      </div>

      {/* Results Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Showing <strong style={{ color: '#fbbf24' }}>{products.length}</strong> Lumina pieces
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          Retrieving Lumina items...
        </div>
      ) : products.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontFamily: "'Cinzel', serif" }}>No Products Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or category filters.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.75rem',
          marginBottom: '4rem'
        }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductsPage;

import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();


    const handleDetails = () => {
        navigate('/detalle');
    }

  return (
    <div>
      {/* hero */}
      <div
        className="hero h-96"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Bienvenido a Pulga Vibe</h1>
            <p className="mb-5">
              Encuentra los mejores productos al mejor precio
            </p>
          </div>
        </div>
      </div>
      {/* productos random */}
      <div className="py-8">
        <div className="w-11/12 lg:w-3/4 mx-auto">
          <h3 className="text-2xl font-bold mb-8">Productos Destacados</h3>
          {/* contenedor de cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* card */}
            <div className="card bg-base-100 shadow-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDetails} >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="card bg-base-100 shadow-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDetails} >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="card bg-base-100 shadow-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDetails} >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="card bg-base-100 shadow-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDetails} >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="card bg-base-100 shadow-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDetails} >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="card bg-base-100 shadow-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDetails} >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Card Title</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            

            
          </div>
        </div>
      </div>
    </div>
  );
}

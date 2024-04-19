import React, {useEffect,useState} from "react"
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa"
import { useParams } from "react-router-dom"

const SingleProduct =()=>{

    const { id } = useParams();
    const [product, setProduct] = useState({}); // Inicializar como un objeto vacío

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("products.json");
                const data = await response.json();
                const product = data.find((p) => p.id == id);
                if (product) {
                    setProduct(product);
                } else {
                    console.error("Producto no encontrado para el ID:", id);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [id]);

    const { title, category, price, image, status } = product;;


    return(
        <div className='mt-28 max-w-screen-2xl container mx-auto x1:px-28 px-4'>
            <div className='p-3 max-w-7xl m-auto'>
                <div className='mt-6 sm:mt-10'>

                    <div className='text-black/75 mt-12'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut qui, consequatur excepturi provident quaerat sed non perferendis reiciendis voluptatibus obcaecati aliquid repellat cupiditate vel dolor illo ad omnis facere sequi.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quaerat beatae dolor natus, eligendi ex, hic a iste autem doloribus voluptate accusamus harum nulla soluta fuga, consectetur explicabo. Odit, fugiat!
                        </p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum a recusandae velit, culpa eaque cupiditate praesentium, adipisci similique animi reiciendis omnis unde quidem ducimus provident accusantium. Maxime alias totam eveniet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci consectetur qui voluptatibus. Et facere voluptatum, incidunt sapiente magni quas quisquam veritatis deleniti accusantium provident explicabo, odio dolores vitae in assumenda?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel deleniti repudiandae nostrum ducimus eum dicta voluptatum inventore tempore, enim aut reiciendis, asperiores totam dolorum, iste perspiciatis! Fugit qui voluptatum pariatur!</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max'>
                        <img src={image} alt="" className='w-full'/>
                    </div>

                    <div>
                        <h1 className='title text-left'>{title}</h1>
                        <p className='mt-3 text-gray-600 text-base leading-6 text-justify sm:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic ducimus modi veritatis maiores at id doloremque debitis corrupti natus tempore sit, quo tempora praesentium voluptatem officiis ullam ad excepturi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi iure nostrum tenetur atque! Doloribus eveniet sit eius! Veritatis, quod, facilis odit tempore eveniet ipsam mollitia iure similique quasi non eius.
                        </p>

                        <span className='my-2 text-xl text-yellow-400 flex items-center gap-1 sm:my-4'>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                        </span>

                        <p className='text-xl text-red-500 font-semibold sm:text-2xl'>${price}</p>
                        <div className='mt-4'>
                        <div className='text-left flex flex-col gap-2 w-full'>
                            <label className='font-semibold'>Cantidad</label>
                            <input type="number" name="price" id="price" defaulValue={1} required className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 focus:border-red-500 " />
                        </div>    
                        <div className='w-full text-left my-4'>
                            <button className='flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white font-bold border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6 '>
                                <span>
                                    Confirmar orden</span>
                                    <FaArrowAltCircleRight/> 
                                    </button>
                                    </div>   
                   </div>
                    </div>

                   

                </div>
            </div>
        </div>
    )
}

export default SingleProduct
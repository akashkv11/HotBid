import React, { useEffect, useState , useRef } from 'react';
import Img from "../images/values-1.png";
import Img2 from "../images/values-3.png";
import { Swiper , SwiperSlide} from "swiper/react";
import SwiperCore , {Navigation, Pagination, Scrollbar, A11y , Autoplay , Thumbs} from "swiper";
import {useSelector , useDispatch} from "react-redux";
import {clearErrors, getProductDetails} from "../../actions/productAction";
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';

import "./productdetails.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/thumbs';
import 'swiper/css/a11y';
import 'font-awesome/css/font-awesome.min.css';






// Swiper Tesing
SwiperCore.use([Navigation , Pagination , Thumbs , Autoplay]);



const ProductDetails = ({match}) => {

    const [didMount, setDidMount] = useState(false); 

    // FIRST STEP
    const dispatch = useDispatch();
    const alert =  useAlert();
// THIRD STEP -> Fetching From Store
const {product , loading , error , sellerDetails } = useSelector((state) => state.productDetails);

// SECOND STEP
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        setDidMount(true);
        // at backend -> req.params.id and at Front end -> match.params.id
    dispatch(getProductDetails(match.params.id));

    return () => setDidMount(false);

    }, [dispatch , match.params.id , error , alert ]);


    const [thumbsSwiper , setThumbsSwiper] = useState(null);

    const slides = []

{product.images &&  product.images.map((item , i) => (
    // element to push
    slides.push(
        <SwiperSlide key = {`slide-${i}`} tag="li">
           <div className="single-prd-item">
                           <img className="img-fluid"
                            key={item.url}
                            src={item.url}
                             alt={`${i} Slide`}/>
                       </div>
        </SwiperSlide>
    )
    ))}


    // for( let i = 0 ; i< 5 ; i+=1){
    //      slides.push(
    //          <SwiperSlide key = {`slide-${i}`} tag="li">
    //             <div className="single-prd-item">
    //                             <img className="img-fluid" src={Img} alt="Product Image"/>
    //                         </div>
    //          </SwiperSlide>
    //      );

    // }

    const thumbs = []

    // for( let i = 0 ; i< 5 ; i+=1){
        //  thumbs.push(
        //      <SwiperSlide key = {`thumb-${i}`} tag="li" style={{listStyle: 'none'}}>
        //             <div className='multiproduct-itm'>
        //                         <img  className='coursel-img2' src={Img2} alt="Product2 Image"/>
        //                         </div>
        //      </SwiperSlide>
        //  );

    // }
    {product.images &&  product.images.map((item , i) => (

        thumbs.push(
            <SwiperSlide key = {`thumb-${i}`} tag="li" style={{listStyle: 'none'}}>
                   <div className='multiproduct-itm'>
                   <img className="img-fluid"
                            key={item.url}
                            src={item.url}
                             alt={`${i} Slide`}/>
                               </div>
            </SwiperSlide>
        )

        ))}

// const sellerInfo= product;
// const {email, name  , phone ,_id } = product.seller;
// let keys = product.keys(product) 
// console.log(keys);
// console.log(product.seller);

// console.log(product.seller);
// {product.seller && product.seller.map((u) => console.log(u.name))}
// console.log()

// For Converting Into Time Format
const year = new Date(product.bidEnd).getFullYear();
const month = new Date(product.bidEnd).getMonth();
const date = new Date(product.bidEnd).getDate();
const hours = new Date(product.bidEnd).getHours();
const minutes = new Date(product.bidEnd).getMinutes();

// console.log(`${date}-${month}-${year}  ${hours}:${minutes}`);


const created_year = new Date(product.createdAt).getFullYear();
const created_month = new Date(product.createdAt).getMonth();
const created_date = new Date(product.createdAt).getDate();
const created_hours = new Date(product.createdAt).getHours();
const created_minutes = new Date(product.createdAt).getMinutes();
// Completed


// Claculate Reaining Time




    const [timerDays , setTimerDays] = useState('00');
    const [timerHours , setTimerHours] = useState('00');
    const [timerMinutes , setTimerMinutes] = useState('00');
    const [timerSeconds , setTimerSeconds] = useState('00');
    
    let interval = useRef();
    
    const startTimer = () => {
    const countdownDate = new Date(product.bidEnd).getTime();
     
    interval = setInterval (() => {
    // GET A NEW CURRENT DATE AT EVERY SECOND
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    const minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60)) ;
    const seconds = Math.floor((distance % (1000 * 60 ))/1000);
    
    if(distance<0){
      // STOP TIMER
    clearInterval(interval.current);
    }
    else{
      setTimerDays(days);
      setTimerHours(hours);
    setTimerMinutes(minutes);
    setTimerSeconds(seconds);
    
    }
    
    },1000);
    };
    
    // COMPONENT DID MOUNT LIFECYCLE
    
    useEffect(() => {
      startTimer();
      return() => {
        clearInterval(interval.current);
      };
    
      
    });
    




    if(!didMount) {
        return null;
      }




// if(sellerDetails.name){
//     console.log(sellerDetails.name);
// }else{
//     console.log(`not rendered`);
// }


// console.log(sellerDetails.name);

  return (
    <>{loading ? (<Loader/>) :(
    <>

    <div className='product_d'>
        <div className="product_image_area">
		<div className="container">
			<div className="row s_product_inner">
				<div className="col-lg-6">



					<div className="s_Product_carousel">
						{/* <div className="single-prd-item">
							<img className="img-fluid" src={Img} alt="Product Image"/>
						</div>
						<div className="single-prd-item">
							<img className="img-fluid" src={Img} alt="Product Image"/>
						</div>
						<div className="single-prd-item">
							<img className="img-fluid" src={Img} alt="Product Image"/>
						</div> */}
<div className='coursel-manage'>
                        <Swiper tag="section" wrapperTag="ul"
                        modules={[Navigation, Pagination , A11y , Autoplay]}
                       id="main"
                       thumbs={{swiper : thumbsSwiper}}
                       slidesPerView={1}
                       navigation
                       pagination={{ clickable: true }}
                       autoplay
                       spaceBetween = {0}
                        
                       >{slides}</Swiper>

</div>

                       <Swiper id="thumbs"
                       spaceBetween={0}
                       slidesPerView={3}
                       onSwiper={setThumbsSwiper}
                       >
                        {thumbs}
                       </Swiper>

					</div>


				</div>
				<div className="col-lg-5 offset-lg-1">
					<div className="s_product_text">
						<h3>{product.itemName}</h3>
						<h2>{`₹ ${product.startingBid}`}</h2>
						<ul className="list">
							<li><a className="active" href="#"><span>Category</span> : {product.category}</a></li>
							<li><a href="#"><span>Ends In </span>{ `: ${timerDays}:${timerHours}:${timerMinutes}:${timerSeconds} `}</a></li>
						</ul>
						<p>
                            {product.description}
                        </p>
						<div className="product_count">
							<label for="qty">Bid Ammount:</label>
							<input type="text" name="qty" id="sst" maxlength="12" value="1" title="Quantity:" className="input-text qty"/>
							{/* <button
							 className="increase items-count" type="button"><i class="fa-solid fa-angle-up"></i></button>
							<button
							 className="reduced items-count" type="button"> <i class="fa-solid fa-chevron-down"></i></button> */}
						</div>
						<div className="card_area d-flex">
							<a className="primary-btn" href="#">Place Bid</a>
                            <div className='pd-social-links'>
							<a className="icon_btn" href="#"><i className="fab fa-facebook-f"></i></a>
							<a className="icon_btn" href="#"><i className="fab fa-instagram"></i></a>
                            <a className="icon_btn" href="#"><i className="fab fa-whatsapp"></i></a>
                            <a className="icon_btn" href="#"><i className="fab fa-linkedin-in"></i></a>

                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

{/* PRODUCT ADDITIONAL INFORMATION */}

<div className='product_info'>
<div className='row'>
          <div className='col-10 mx-auto'>



          <div className="section-title" data-aos="fade-up">
          <h2>Additional Information</h2>
          <p>Product Seller and other Additional Information</p>
        </div>

{/* Section Starts */}

        <section id="features" className="features">
      <div className="container" data-aos="fade-up">

        <ul className="nav nav-tabs row gy-4 d-flex justify-content-center">

          <li className="nav-item col-6 col-md-4 col-lg-2">
            <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#tab-1">
              <i className="bi bi-binoculars color-cyan"></i>
              <h4>Seller</h4>
            </a>
          </li>

          <li className="nav-item col-6 col-md-4 col-lg-2">
            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-2">
              <i className="bi bi-box-seam color-indigo"></i>
              <h4>Product</h4>
            </a>
          </li>


        </ul>

        <div className="tab-content">


{/* Card CSS */}



          <div className="tab-pane active show card" id="tab-1">


            <div className="row gy-4">
              <div className="col-lg-8 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">
              <div className="tab-pane fade show active profile-overview" id="profile-overview">


                 <h5 className="card-title">Seller Details</h5>

                 <div className="row">
                   <div className="col-lg-3 col-md-4 label ">Seller Name</div>
                   <div className="col-lg-9 col-md-8">cbydbycbd</div>

                   {/* <div className="col-lg-9 col-md-8">{sellerInfo.name}</div> */}
                 </div>

                 <div className="row">
                   <div className="col-lg-3 col-md-4 label">Job</div>
                   <div className="col-lg-9 col-md-8">User</div>
                 </div>




                 <div className="row">
                   <div className="col-lg-3 col-md-4 label">Phone</div>
                   <div className="col-lg-9 col-md-8">552252525</div>
                   {/* <div className="col-lg-9 col-md-8">{sellerInfo.phone}</div> */}

                 </div>

                 <div className="row">
                   <div className="col-lg-3 col-md-4 label">Email</div>
                   <div className="col-lg-9 col-md-8">chbhcbdhbc</div>
                   {/* <div className="col-lg-9 col-md-8">{sellerInfo.email}</div> */}

                 </div>

               </div>
              </div>
              <div className="col-lg-4 order-1 order-lg-2 text-center" data-aos="fade-up" data-aos-delay="200">
                <img src={Img} alt="" className="img-fluid"/>
              </div>
            </div>
          </div>

          <div className="tab-pane card" id="tab-2">
            <div className="row gy-4">


            <div className="tab-pane fade show active profile-overview" id="profile-overview">


                 <h5 className="card-title">Product Details</h5>

                 <div className="row">
                   <div className="col-lg-3 col-md-4 label ">Product Name</div>
                   <div className="col-lg-9 col-md-8">{product.itemName}</div>
                 </div>

                 {/* <div className="row">
                   <div className="col-lg-3 col-md-4 label">Description</div>
                   <div className="col-lg-9 col-md-8">{product.description}</div>
                 </div> */}

                 <div className="row">
                   <div className="col-lg-3 col-md-4 label">Created At</div>
                   <div className="col-lg-9 col-md-8">{`${created_date}-${created_month}-${created_year}  ${created_hours}:${created_minutes}`}</div>
                 </div>





                 <div className="row">
                   <div className="col-lg-3 col-md-4 label">Initial Price</div>
                   <div className="col-lg-9 col-md-8">{product.startingBid}</div>
                 </div>


                 <div className="row">
                   <div className="col-lg-3 col-md-4 label">End Time</div>
                   <div className="col-lg-9 col-md-8">{`${date}-${month}-${year}  ${hours}:${minutes}`}</div>
                 </div>

               </div>

            </div>
          </div>









        </div>

      </div>
    </section>






          </div></div>





</div>






    </div></>
    ) }</>
  );
};

export default ProductDetails;
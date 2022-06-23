import React, { useEffect, useRef, useState ,useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import OwlCarousel from 'react-owl-carousel2';
import "./owl.carousel.css";


const Shop_index = (props) => {


    const mounted = useRef();
    const apipath = 'index.php?m=content&c=index&a=getshop'
    const [jsondata, datachange] = useState(null);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);

    const requireShop = require.context("./shop", true, /\.(png|jpe?g|svg)$/);
    const shopimg = requireShop.keys().map(requireShop);

    const myArray = ['Jack', 'Mary', 'John', 'Krish', 'Navin'];
    const [banner, bannerchange] = useState(null);
    const oldbanner = useRef();

    const RefCarousel = useRef(OwlCarousel);

    const target = useRef(0);
    const [bannerid, banneridchange] = useState(0);
    const getorderlist = () => {

        props._loading(true)
        axios.get('index.php?m=link&c=index&a=getbanner&webtype=react', {
        }).then(function (response) {
            var res = response.data;
            props._loading(false)
            if (res.status == -1) {

            } else if (res.status == 1) {



                bannerchange(res.data)
            }

        }).catch(function (err) {
            console.log(err);
        });



    }


    const events = {
        onDragged: function(event) {

        },
        onChange:function(event){

        },
        onChanged: function(event) {

            bchange(event.page.index)
        }
    };

    const bchange=(id)=>{
        var $mc=$(".indexshoplist li:eq("+id+")");
        var $omc=$mc.siblings()
        $mc.addClass("target")
        $omc.removeClass("target")
    }

      const carouselOptions = {
        items: 1,
        nav: false,
        autoplay: true,
         rewind: true,
         loop: true
      };



      const myover=(id)=>{



            RefCarousel.current.goTo(id)

      }
    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;

            props._loading(true)
            axios.get(apipath, {
            }).then(function (response) {
                var res = response.data;
                datachange(res.data[0].data)
                props._loading(false)
                getorderlist()



            }).catch(function (err) {

                console.log(err);
            });


        }
        else { //componentDidUpdate

            if (banner != oldbanner.current) {

                console.log(banner)
                bchange(0)
                oldbanner.current = banner

            }
            console.log(bannerid)

        }

    }, [props, jsondata, banner,bannerid]);


    return (

        <div>

            {jsondata === null ? "" :
                <div className='webwidth'>

{banner === null ? "" :
                    <div className='indextop'>
                        <div className="row px-0 py-0 mx-0 my-0">
                            <div className='col-12 col-xl-8 px-0 py-0 mx-0 my-0'>
                                <div className='w-100'>
                                    <div className='indexbanner'>
                                        {/*
                                        <Carousel showArrows={true} showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true}>
                                    {Object.entries(banner).map((t, k) => <Link key={k} to={t[1].url}><div><img src={t[1].logo} className='w-100' /></div></Link>)}
                                    </Carousel>

                                        */}


                                    {
                                    <OwlCarousel options={carouselOptions}  events={events} ref={RefCarousel}>



                                            {Object.entries(banner).map((t, k) => <Link key={k} to={t[1].url}><div><img src={t[1].logo} className='w-100' /></div></Link>)}



                                        </OwlCarousel>
                                    }








                                        </div>
                                </div>
                            </div>
                            <div className='col-xl-4 d-none d-xl-block px-0 py-0 mx-0 my-0'>

                                <div className='indexshoplist px-0 py-0'>
                                    <ul>
                                    {Object.entries(banner).map((t, k) => <li key={k}><a  onClick={()=>myover(t[0])}>{t[1].name}</a></li>)}



                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
}


                    <div className='indexlist'>


                        <div className="row ps-0 py-0 mx-0 my-0 paddright5">
                            {Object.entries(jsondata).map((t, k) => <Link key={k} to={'/Shop_detail?id=' + t[1].id + '&catid=' + t[1].catid}><div className='col-6 col-sm-4 col-md-3 col-xl-2 indexshopStyle' key={k}><div className='indexshopbody'><div className='indexshopimg' style={{ backgroundImage: `url(${t[1].thumb})` }}></div><div className='indexshoptext'>{t[1].title}</div><div className='indexshopprice'>{t[1].shop_prize}</div></div></div></Link>)}


                        </div>


                    </div>


                </div>



            }
        </div>


    );
}
export default Shop_index;

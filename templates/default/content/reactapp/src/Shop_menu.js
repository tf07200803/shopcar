import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#76bb9f',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Shop_menu = (props) => {


    const mounted = useRef();
    const [admincc, adminccchange] = useState(true);

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const hisback=()=>{
        history.goBack()
    }


    const login = () => {
        props.login(true)
        setOpen(false);
    }
    const reg = () => {
        props.reg(true)
        setOpen(false);
    }
    const history = useHistory();


    const pagechange = (url) => {

        history.push(url);
        setOpen(false);
    }
    const showmsg = (str) => {
        alert(str)
    }
    const adminloginout = () => {

        props._adminlogout()
    }

    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;





        }
        else { //componentDidUpdate
            //console.log(props.vipdata)
            if (history.location.pathname.indexOf('Admin') != -1) {
                props.isadmin(false)
                adminccchange(false)
                document.body.style.backgroundColor = '#ccc'
            } else {
                props.isadmin(true)
                adminccchange(true)
                document.body.style.backgroundColor = '#fff'
            }
            /*if(history.location.pathname.indexOf('Admin')!=-1){
                props._checkadmindata()
            }*/

        }

    }, [props, history]);
    return (

        <div>


            <div>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                MENU
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <List>




                        {props.vipdata ? null : <ListItem button className='buttomtype' onClick={() => login()}><ListItemText primary='??????' /></ListItem>}
                        {props.vipdata ? null : <ListItem button className='buttomtype' onClick={() => reg()}><ListItemText primary='??????' /></ListItem>}


                        {props.vipdata ? <ListItem button className='buttomtype' onClick={() => pagechange('/Shop_order_list')}><ListItemText primary={props.vipdata.order[0].data.length > 0 ? '???????????? (' + props.vipdata.order[0].data.length + ')' : '????????????'} /></ListItem> : null}
                        {props.vipdata ? <ListItem button className='buttomtype' onClick={() => { props.shoplist.length > 0 ? pagechange('/Shop_carlist') : showmsg('???????????????') }}><ListItemText primary={props.shoplist.length > 0 ? '????????? (' + props.shoplist.length + ')' : '?????????'} /></ListItem> : null}

                        <ListItem button className='buttomtype' onClick={() => pagechange('/')}><ListItemText primary='?????????' /></ListItem>

                        {props.vipdata ? <ListItem button className='buttomtype' onClick={() => props.loginout()}><ListItemText primary='??????' /></ListItem> : null}


                    </List>
                </Dialog>
            </div>

            {!admincc ?
                <div className='menushow col-12 px-0 py-0 mx-0 my-0'>

                    <ul className='d-none d-lg-block d-xl-block d-md-block d-sm-block'>
                        {props._admindata ? <li className='buttomtype' onClick={() => adminloginout()}>??????</li> : null}
                    </ul>
                </div>


                :
                <div className='menushow col-12 px-0 py-0 mx-0 my-0'>


                    <ul className='d-none d-lg-block d-xl-block d-md-block d-sm-block'>

                        {props.vipdata ? null : <li className='buttomtype' onClick={() => login()}>??????</li>}
                        {props.vipdata ? null : <li className='buttomtype' onClick={() => reg()}>??????</li>}

                        {props.vipdata ? <li>{props.vipdata.nickname} ??????</li> : null}
                        {props.vipdata ? <li className='buttomtype' onClick={() => pagechange('/Shop_order_list')}><FontAwesomeIcon icon={fas.faFileInvoice} className='me-1'/>????????????{props.vipdata.order[0].data.length > 0 ? '(' + props.vipdata.order[0].data.length + ')' : ''}</li> : null}
                        {props.vipdata ? <li className='buttomtype' onClick={() => { props.shoplist.length > 0 ? pagechange('/Shop_carlist') : showmsg('???????????????') }}><FontAwesomeIcon icon={fas.faCartPlus} className='me-1'/>?????????{props.shoplist.length > 0 ? '(' + props.shoplist.length + ')' : ''}</li> : null}

                        <li className='buttomtype' onClick={() => pagechange('/')}>?????????</li>

                        {props.vipdata ? <li className='buttomtype' onClick={() => props.loginout()}>??????</li> : null}




                    </ul>


                    <div className="menubtn d-flex d-lg-none d-xl-none d-md-none d-sm-none row align-items-center h-100 justify-content-between  px-0 py-0 mx-0 my-0">

                    {history.location.pathname=='/' ? <div className='col-auto' style={{
                            width: '30px',
                            height: '30px'

                        }}>

                        <img src={logo} className='h-100' />

                        </div>:

                        <div className='col-auto' onClick={hisback} style={{
                            width: '40px',
                                height: '40px',
                                color:'#fff'

                        }}>

                        <FontAwesomeIcon icon={fas.faAngleLeft} className='w-100 h-100' />

                        </div>
                        }


{props.vipdata ? <div className='col-auto mobilecentertitle'>

{props.vipdata.nickname} ??????

</div>:''
                        
}


                        <div className='col-auto' onClick={handleClickOpen} style={{
                            width: '40px',
                            height: '40px',
                                color:'#fff'

                        }}><FontAwesomeIcon icon={fas.faAlignJustify} className='w-100 h-100' /></div>




                    </div>

                </div>



            }




            <div className='showcontent'>{props.children}</div>


        </div>


    );
}
export default Shop_menu;

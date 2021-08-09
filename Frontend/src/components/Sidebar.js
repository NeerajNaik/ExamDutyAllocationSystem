import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const SidebarData2=[];
  for(let i=0;i<props.k.length;i++)
  {
    console.log(props.k[i])
       SidebarData2.push(
      {
        title: props.k[i]['name_of_exam'],
        // path: '/overview',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    
        subNav: [
          {
            title: props.k[i]['description_of_exam'],
            // path: '/overview/users',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: props.k[i]['created_at'],
            // path: '/overview/revenue',
            icon: <IoIcons.IoIosPaper />
          }
        ]
      },
    )
  }
  // (props.k).forEach((e) => {
  //   console.log(e)
  //   // SidebarData2.append(
  //   //   {
  //   //     title: e['name_of_exam'],
  //   //     path: '/overview',
  //   //     icon: <AiIcons.AiFillHome />,
  //   //     // iconClosed: <RiIcons.RiArrowDownSFill />,
  //   //     // iconOpened: <RiIcons.RiArrowUpSFill />,
    
  //   //     subNav: [
  //   //       {
  //   //         title: e['description_of_exam'],
  //   //         path: '/overview/users',
  //   //         icon: <IoIcons.IoIosPaper />
  //   //       },
  //   //       {
  //   //         title: e['created_at'],
  //   //         path: '/overview/revenue',
  //   //         icon: <IoIcons.IoIosPaper />
  //   //       }
  //   //     ]
  //   //   },
  //   // )
    
  // });
// console.log(SidebarData2)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <a className="headeralign" >Exam Supervision Duty Allocation System</a>
          {props.handle_logout && <button className='btn btn-danger headerlogout' onClick={props.handle_logout} ><b>Logout</b></button> }
        </Nav>
        <SidebarNav sidebar={sidebar} className='scrollsidebar' >
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {/* <NavIcon> */}
              
              {/* </NavIcon> */}
            {props.handle_logout && <h3 style={{color:'#fff'}}><FaIcons.FaUserCircle/><b>{props.email}<hr/></b></h3> }
            {console.log(props.k.length)}
            {/* {props.email && <b></b>} */}
            {props.handle_logout && SidebarData2.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
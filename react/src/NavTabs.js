import React from 'react';

function getActiveClassName(pathname, currentPathname) {
  return pathname == currentPathname ? "active" : ""
}
function NavTabs({pathname, history}) {

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className={"nav-link " + getActiveClassName('/up', pathname)}
            onClick={()=>{
              history.push("/up");
            }}
        >UP</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + getActiveClassName('/down', pathname)}
            onClick={()=>{
              history.push("/down");
            }}
        >Down</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + getActiveClassName('/tmp', pathname)}
            onClick={()=>{
              history.push("/tmp");
            }}
        >Tmp</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + getActiveClassName('/notes', pathname)}
            onClick={()=>{
              history.push("/notes");
            }}
        >Notes</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + getActiveClassName('/loa', pathname)}
            onClick={()=>{
              history.push("/loa");
            }}
        >Loa</a>
      </li>
    </ul>
  );
}
export default NavTabs;

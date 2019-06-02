import React from 'react';
function NavTabs({pathname, history}) {
  const upActiveClassName = pathname == '/up' ? "active" : "";
  const downActiveClassName = pathname == '/down' ? "active" : "";
  const tmpActiveClassName = pathname == '/tmp' ? "active" : "";
  const notesActiveClassName = pathname == '/notes' ? "active" : "";
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className={"nav-link " + upActiveClassName}
            onClick={()=>{
              history.push("/up");
            }}
        >UP</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + downActiveClassName}
            onClick={()=>{
              history.push("/down");
            }}
        >Down</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + tmpActiveClassName}
            onClick={()=>{
              history.push("/tmp");
            }}
        >Tmp</a>
      </li>
      <li className="nav-item">
        <a className={"nav-link " + notesActiveClassName}
            onClick={()=>{
              history.push("/notes");
            }}
        >Notes</a>
      </li>
    </ul>
  );
}
export default NavTabs;

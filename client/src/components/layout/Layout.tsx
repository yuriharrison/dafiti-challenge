import React, { Fragment } from 'react'

import { Link } from '@reach/router'

const Header:React.FC<{currentPath:string}> = ({ currentPath }) => {
  const navItemClass = (path:string) => `nav-item ${ currentPath == path && 'active' }`

  return (<header>
    <div className="row d-block">
      <nav className="navbar fixed-top navbar-expand navbar-light bg-light shadow-lg">

        <a className="navbar-brand mb-0 h1" href="/portal/">Dafiti Challenge</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className={ navItemClass('shoes') }>
              <Link className="nav-link" to="/shoes">Shoes</Link>
            </li>
            <li className={ navItemClass('import') }>
              <Link className="nav-link" to="/import">Import</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>);
};

const Footer = () => (
  <footer className="page-footer font-small text-light bg-dark rounded-top">
    <div className="text-center py-3">
      <p>Footer</p>
    </div>
  </footer>
);

interface ILayoutProps {
  Section: JSX.Element,
  Content: JSX.Element
}

type LayoutT<P=any> = (content:React.FC<P>) => React.FC<P>
const Layout:LayoutT = (content) => (props) => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="container-fluid mb-5">
          <Header currentPath={ props.path } />
        </div>
        <div className="container-fluid">
          <div className="row">
          { React.createElement(content, props) }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout
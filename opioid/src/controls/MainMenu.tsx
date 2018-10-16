import * as React from 'react'
import { Link } from "react-router-dom";

type BasicProps = {} & {}

const MainMenu: React.SFC<BasicProps> = () => 
    (<nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="my-important-menu" >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
        <div className="navbar-menu" id="my-important-menu">
            <div className="navbar-end">
                <Link className="navbar-item" to="/">Home</Link>
                <Link className="navbar-item" to="/CountyHealth">County Health Care Data</Link>
                <Link className="navbar-item" to="/SubstanceAbuse">Substance Abuse Data</Link>
                <Link className="navbar-item" to="/CourtData">Court Data</Link>
                <Link className="navbar-item" to="/SocialServices">Social Services Data</Link>
                <Link className="navbar-item" to="/HonestBroker">Honest Broker</Link>
                <Link className="navbar-item" to="/Research">Researchers</Link>
                <Link className="navbar-item" to="/HealthCare">Health Care Providers</Link>
            </div>
        </div>
    </nav>)

export default MainMenu
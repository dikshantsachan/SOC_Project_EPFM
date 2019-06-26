import React from 'react';
import './SideDrawer.css';

const sideDrawer = props => (
    <nav className="side-drawer">
        <ul>
            <button type="button" class="btn btn-primary btn-sm">Feedback</button>
            <button type="button" class="btn btn-primary btn-sm">Dashboard</button>
            <button type="button" class="btn btn-primary btn-sm">Chatbot</button>
        </ul>
    </nav>
)

export default sideDrawer;
import React from 'react';
import { connect } from 'react-redux';
import {Spin} from "antd";

const Loader = ({ isLoading }) => {
    if (!isLoading) return null;


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Spin  size="large"/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state.loader.isLoading,
});

export default connect(mapStateToProps)(Loader);

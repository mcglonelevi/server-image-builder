import React from 'react';
import { useParams } from "react-router-dom";

export default function View() {
    const { id } = useParams();
    const url = `${process.env.REACT_APP_API_HOST}/images/${id}`;

    return (
        <>
            <div>
                <img className={'img-fluid'} src={url} alt={'server'} />
            </div>
            <div className="card" style={{ marginTop: '10px' }}>
                <div className="col form-group">
                    <label>Image URL</label>
                    <input type='text' className="form-control" disabled={true} value={url} />
                </div>
            </div>
        </>
    );
}
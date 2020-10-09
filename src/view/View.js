import React from 'react';
import { useParams } from "react-router-dom";

export default function View() {
    const { id } = useParams();
    const url = `http://localhost:3000/images/${id}`;

    return (
        <>
            <div>
                <img className={'img-fluid'} src={url} alt={'server image'} />
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
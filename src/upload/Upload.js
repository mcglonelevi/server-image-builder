import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import { useHistory } from "react-router-dom";

export default function Upload() {
    const [picture, setPicture] = useState(null);
    const history = useHistory();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData();
            data.append('background-image', picture);

            fetch(`${process.env.REACT_APP_API_HOST}/images/upload`, {
              method: 'POST',
              body: data
            }).then(async response => {
                const json = await response.json();
                history.push(`/editor/${json.filename}`);
            }).catch(err => {
                console.log(err);
            });
        }}>
            <ImageUploader
                withPreview={true}
                buttonText='Choose Background Image'
                onChange={(files) => setPicture(files[0])}
                imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                singleImage={true}
                maxFileSize={5242880}
                name='background-image'
            />
            <input type="submit" value="Upload" className="btn btn-primary" disabled={picture ? false : true} />
        </form>
    );
}

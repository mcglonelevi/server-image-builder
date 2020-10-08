import React, { useEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';
const FontNames = require('../Font.json');

async function loadAndUse(font) {
    const myfont = new FontFaceObserver(font);
    await myfont.load();
}

const useObjectProperty = (canvas, property, object) => {
    const [propertyState, setPropertyState] = useState(null);

    useEffect(() => {
        setPropertyState(null);
    }, [property, object, setPropertyState]); // When property or object change, we need to clear property state.

    const updater = async (value) => {
        if (property === 'fontFamily') {
            await loadAndUse(value);
        }
        object.set(property, value);
        setPropertyState(value);
        canvas.current.renderAll();
    };
    
    return [propertyState ? propertyState : (object ? object[property] : null), updater];
};

export default function EditMenu({ canvas, objects }) {
    const shouldRender = canvas.current != null && objects.length === 1;
    
    const [fontFamily, updateFontFamily] = useObjectProperty(canvas, 'fontFamily', objects[0]);
    const [fontSize, updateFontSize] = useObjectProperty(canvas, 'fontSize', objects[0]);
    const [fontColor, updateFontColor] = useObjectProperty(canvas, 'fill', objects[0]);

    if (shouldRender) {
        return (
            <div className="card" style={{ marginTop: '15px', }}>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-sm">
                            <label>Font Family</label>
                            <select
                                value={fontFamily}
                                onChange={(e) => updateFontFamily(e.target.value)}
                                className="form-control"
                            >
                                {FontNames.map((name) => <option key={name}>{name}</option>)}
                            </select>
                        </div>
                        <div className="form-group col-sm">
                            <label>Font Size</label>
                            <input
                                type="number"
                                className="form-control"
                                value={fontSize} onChange={(e) => updateFontSize(e.target.value)} />
                        </div>
                        <div className="form-group col-sm">
                            <label>
                            Font Color
                            </label>
                            <input
                                className="form-control"
                                type="color"
                                value={fontColor}
                                onChange={(e) => updateFontColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
import React, { useEffect, useState } from 'react';

const useObjectProperty = (canvas, property, object) => {
    const [propertyState, setPropertyState] = useState(null);

    useEffect(() => {
        setPropertyState(null);
    }, [property, object, setPropertyState]); // When property or object change, we need to clear property state.

    const updater = (value) => {
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
            <div>
                <div>
                    <label htmlFor="font-family">Font Family</label>
                    <select id="font-family" value={fontFamily} onChange={(e) => updateFontFamily(e.target.value)}>
                        <option>Comic Sans</option>
                        <option>Arial</option>
                        <option>Consolas</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="font-size">Font Size</label>
                    <input id="font-size" type="number" value={fontSize} onChange={(e) => updateFontSize(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="font-color">Font Color</label>
                    <input id="font-color" type="color" value={fontColor} onChange={(e) => updateFontColor(e.target.value)} />
                </div>
            </div>
        );
    }

    return null;
}
import React, { useEffect, useState } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        border: 'solid 1px black',
        borderRadius: 3,
        color: 'white',
        '& > *': {
            margin: '30px',
        }
    },
    colorPicker: {
        width: '50px',
    }
});

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

    const classes = useStyles();

    if (shouldRender) {
        return (
            <Box className={classes.root}>
                <Box>
                    <InputLabel shrink htmlFor="font-family">
                        Font Family
                    </InputLabel>
                    <NativeSelect
                        inputProps={{
                            id: 'font-family',
                        }}
                        value={fontFamily}
                        onChange={(e) => updateFontFamily(e.target.value)}
                    >
                        <option>Comic Sans</option>
                        <option>Arial</option>
                        <option>Consolas</option>
                    </NativeSelect>
                </Box>
                <Box>
                    <TextField label="Font Size" type="number" value={fontSize} onChange={(e) => updateFontSize(e.target.value)} />
                </Box>
                <Box>
                    <InputLabel shrink htmlFor="font-color">
                      Font Color
                    </InputLabel>
                    <Input
                        inputProps={{
                            id: 'font-color',
                        }}
                        type="color"
                        value={fontColor}
                        onChange={(e) => updateFontColor(e.target.value)}
                        className={classes.colorPicker}
                    />
                </Box>
            </Box>
        );
    }

    return null;
}
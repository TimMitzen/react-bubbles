import React, { useState } from "react";
import axios from "axios";
import { authWithAxios } from "../utils/authWithAxios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    authWithAxios()
    .put(`/colors/${colorToEdit.id}`,colorToEdit)
    .then(response=>{
      setEditing(false);
      
    })
    .catch(error=>console.log('ERROR',error))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    authWithAxios()
    .delete(`/colors/${color.id}`, color)
    .then(response=>{
      setEditing(false)

    })
    .catch(error=>console.log('Error',error))
  };
  const addColor = (event) => {
    authWithAxios()
    .post(`colors`, colorToAdd)
    .then(response=>updateColors([...colors, colorToAdd]))
    .catch()
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <label htmlFor='add'>
          Add Color
        <input type='text' name='addcolor' value={colorToAdd.color} onChange={event=>setColorToAdd({
          ...colorToAdd, color: event.target.value
        })}/>
        </label>
        <label htmlFor="hex">
        Add Hex
        <input type='text' name='addhex' onChange={event=>setColorToAdd({...colorToAdd, code: {hex: event.target.value } 
        })} value={colorToAdd.code.hex}  />
        </label>
        <button type='submit'>Add</button>

      </form>

    </div>
  );
};

export default ColorList;

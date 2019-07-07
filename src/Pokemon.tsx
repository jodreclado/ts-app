import React, { FunctionComponent } from "react";

interface IProps {
  name: string;
  id: number;
  sprites: { [key: string]: string };
  height: number;
  weight: number;
}

const Pokemon: FunctionComponent<IProps> = props => {
  const { name, id, sprites, height, weight } = props;

  return (
    <div>
      <div className="image-container">
        <img src={sprites.front_default} alt={"front"} />
        <img src={sprites.back_default} alt={"back"} />
      </div>
      <div className="info">
        <h3>{name.toUpperCase()}</h3>
        {`#${id} — Height: ${height} — Weight: ${weight}`}
      </div>
    </div>
  );
};

export default Pokemon;
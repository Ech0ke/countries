function Card({ name, region, area }) {
  return (
    <div className="card--wrap">
      <h3>{name}</h3>
      <p>Region: {region}</p>
      <p>Area: {area} km²</p>
    </div>
  );
}

export default Card;

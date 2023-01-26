function NavBar({
  sortAscending,
  handleCheck,
  check: { area, region },
  sortChange,
}) {
  const sortText = sortAscending ? (
    <>
      A<br />Z
    </>
  ) : (
    <>
      Z<br />A
    </>
  );

  return (
    <nav>
      <h1>Countries info list</h1>
      <div className="navbar--controlButtons">
        <label className="navbar--filter navbar--area">
          <input
            type="checkBox"
            name="area"
            onChange={handleCheck}
            checked={area}
          />
          Area &lt; Lithuania
        </label>

        <label className="navbar--filter navbar--region">
          <input
            type="checkBox"
            name="region"
            onChange={handleCheck}
            checked={region}
          />
          Region: Oceania
        </label>

        <button className="navbar--sort" onClick={sortChange}>
          <span className="material-symbols-outlined">arrow_downward</span>
          <span className="navbar--sortText">{sortText}</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

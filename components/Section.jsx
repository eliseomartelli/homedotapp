export const Section = ({ title, children, sm }) => {
  const cols = sm ? "grid grid-cols-5" : "grid grid-cols-4";
  return (
    <section className="mt-8">
      <h3 className="text-xl mb-4 ml-1">{title}</h3>
      <div className={cols}>{children}</div>
    </section>
  );
};

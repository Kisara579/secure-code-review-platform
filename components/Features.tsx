const features = [
  "Secure Code Analysis",
  "Secret Detection",
  "Dependency Scanning",
  "Technical Debt Analysis",
];
export default function Features() {
  return (
    <section>
      <h2> Core Features </h2>

      <div>
        {features.map((feature) => (
          <p key={feature}>{feature}</p>
        ))}
      </div>
    </section>
  );
}

type Props = {};

export default function Home({}: Props) {
  return (
    <section>
      <h2 className="text-3xl font-semibold my-5">Student Management System</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eligendi
        illum, expedita maiores perferendis fuga et autem natus sapiente amet
        quidem, unde quaerat iste cum reiciendis, commodi ipsum iure dolore.
      </p>
      <div className="grid place-items-center my-20">
        <img className="w-2/3" src="/bg.png" alt="bg-student" />
      </div>
    </section>
  );
}

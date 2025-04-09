const Background = () => {
  return (
    <div className="fixed inset-0 w-full min-h-screen bg-cover bg-center blur-md bg-[url('/Signup.jpg')]">
      {/*  overlay gelap*/}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
};

export default Background;

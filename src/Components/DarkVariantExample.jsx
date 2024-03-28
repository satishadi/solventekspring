import Carousel from "react-bootstrap/Carousel";

const DarkVariantExample = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className=" w-10"
          src="https://m.economictimes.com/thumb/msid-69278711,width-1200,height-450,resizemode-4,imgsize-132321/home-insurance-getty.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className=" w-10"
          src="https://wealthguruji.com/wp-content/uploads/2019/11/Insurance1.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default DarkVariantExample;

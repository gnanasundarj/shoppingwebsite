import React from "react";
import styled from "styled-components";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GoArrowSmallRight } from "react-icons/go";
import { Link1, Link2 } from "../../Data/Data";
let Container = styled.div`
  background-color: rgb(236 236 230);
  min-height: 300px;
  width: 100vw;
  padding: 30px;
  gap: 100px;
`;
let List = styled.h3`
  font-size: 20px;
  flex: 1;
`;
let Desc = styled.div`
  font-size: 20px;
  flex: 1;
`;

let Add = styled.div`
  flex-wrap: wrap;
  gap: 100px;
`;
let Con = styled.div`
  flex: 1;
`;
let Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
const Payment = styled.img`
  width: 50%;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
let Detail = styled.p`
  font-size: 20px;
`;
export default function Footer() {
  return (
    <Container className="d-flex">
      <Desc>
        <h1 className="mb-3"> fashion outlet .</h1>
        <div>
          If you would like to experience the best of online shopping for men,
          women and kids in India, you are at the right and place. Myntra is the
          ultimate destination for fashion and lifestyle, being host to a wide
          array of merchandise are including clothing, footwear,
          accessories,toys, jewellery.
        </div>
      </Desc>
      <List>
        <Title className="mb-4">Useful Links</Title>
        <Add className="d-flex ">
          <div>
            {Link1.map((item) => {
              return (
                <p>
                  {" "}
                  <GoArrowSmallRight size={30} /> {item}
                </p>
              );
            })}
          </div>
          <div>
            {Link2.map((item) => {
              return (
                <p>
                  {" "}
                  <GoArrowSmallRight size={30} /> {item}
                </p>
              );
            })}
          </div>
        </Add>
      </List>
      <Con>
        <Title className="mb-3">Contact</Title>

        <Detail>
          <ContactItem>
            <HiLocationMarker size={25} style={{ marginRight: "10px" }} /> 622
            New Path , South Chennai 624802
          </ContactItem>
          <ContactItem>
            <BsFillTelephoneFill size={25} style={{ marginRight: "10px" }} />{" "}
            +91 455 233
          </ContactItem>
          <ContactItem>
            <HiMail size={25} style={{ marginRight: "10px" }} />{" "}
            contact@customer.dev
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Detail>
      </Con>
    </Container>
  );
}

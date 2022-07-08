import React from 'react'
import { Card , Skeleton} from 'antd'
import { Link } from 'react-router-dom'
import { Navigate } from "react-router-dom";
const { Meta } = Card;

const CardDashboard = ({ title , value, link, onClickFunction , cardIcon, loading = true }) => {
  return (
    <>
      <Card
        actions={
          !loading
            ? [
                <Link to={link || "#"} onClick={onClickFunction || null}>
                  View More
                </Link>,
              ]
            : undefined
        }
      >
        {!loading ? (
          <Meta avatar={cardIcon} title={"# " + title} description={value} />
        ) : (
          <Skeleton title={false} loading={loading} active avatar></Skeleton>
        )}
      </Card>
    </>
  );
}

export default CardDashboard
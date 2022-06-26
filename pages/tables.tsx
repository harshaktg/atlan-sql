import Head from "next/head";
import { APP_NAME } from "config/constants";
import Table from "components/common/Table";
import { useEffect, useState } from "react";
import AppLayout from "components/layouts/AppLayout";

function tables() {
  const [queries, setQueries] = useState([]);

  /**
   * Function to fetch all entries in the Product table
   */
  const fetchAllQueries = async () => {
    const response = await fetch(`/api/allqueries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const queries = await response.json();
    console.log(queries);
    setQueries(queries.data);
  };

  useEffect(() => {
    fetchAllQueries();
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>{`${APP_NAME} | Tables`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full overflow-auto">
        <Table data={queries} />
      </div>
    </AppLayout>
  );
}

export default tables;

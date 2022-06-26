import Head from "next/head";
import { APP_NAME } from "config/constants";
import { Menu, Input, Button } from "antd";
import { useState, useCallback, useEffect, useContext } from "react";
import { useAppContext } from "contexts/AppContext";
import AppLayout from "components/layouts/AppLayout";
import Table from "components/common/Table";

const { TextArea } = Input;

function queries() {
  const { queries, setQueries } = useAppContext();

  const [query, setQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  /**
   * Function to handle Query change
   */
  const handleQueryChange = useCallback((e) => {
    setIsInvalid(false);
    setQuery(e.target.value);
  }, []);

  /**
   * Function to fetch queries
   * @param selectId
   */
  const fetchQueries = async (selectId = null) => {
    const response = await fetch(`/api/queries`, {
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
    setQueries(
      queries.data.map((query) => ({
        ...query,
        label: `${query.name} - ${query.query}`,
        key: query.id,
      }))
    );
    if (queries.data.length && selectId) {
      setCurrentQuery(queries.data.find((q) => q.id === selectId));
    }
  };

  /**
   * Effect to fetch all queries
   */
  useEffect(() => {
    fetchQueries();
  }, []);

  /**
   * Effect to set current query
   */
  useEffect(() => {
    if (currentQuery) {
      setQuery(currentQuery.query);
    } else {
      setQuery("");
    }
  }, [currentQuery]);

  /**
   * Function to set current query
   * @param e
   */
  const handleQueryClick = (e) => {
    setCurrentQuery(queries.find((q) => q.id === e.key));
  };

  /**
   * Function to post query to backend
   * @returns
   */
  const handleExecute = async () => {
    if (!query.trim()) {
      setIsInvalid(true);
      return;
    }
    const response = await fetch(`/api/queries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const resp = await response.json();
    console.log(resp);
    await fetchQueries(resp.id);
    resetQuery();
  };

  function resetQuery() {
    setQuery("");
  }

  return (
    <AppLayout>
      <Head>
        <title>{`${APP_NAME} | Queries`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full">
        <div className="basis-72 py-4 overflow-auto">
          <div className="flex justify-center py-2">
            <Button
              type="primary"
              className="w-3/4"
              onClick={() => setCurrentQuery(null)}
            >
              New Query
            </Button>
          </div>
          <div className="h-[calc(100%-3rem)] overflow-auto">
            <Menu
              items={queries}
              onClick={handleQueryClick}
              selectedKeys={currentQuery ? [currentQuery.id] : []}
            />
          </div>
        </div>
        <div className="grow p-4">
          <div className="flex justify-center gap-x-4 items-center pt-2 pb-6">
            <div className="w-3/6">
              <TextArea
                rows={2}
                placeholder="Enter SQL query"
                className="resize-none"
                value={query}
                onChange={handleQueryChange}
                disabled={!!currentQuery}
                status={isInvalid ? "error" : null}
                onPressEnter={handleExecute}
              />
            </div>
            {!currentQuery && (
              <Button type="primary" onClick={handleExecute}>
                Execute
              </Button>
            )}
          </div>
          {currentQuery && (
            <div className="h-[calc(100%-6rem)] overflow-auto">
              <Table data={currentQuery.data} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default queries;

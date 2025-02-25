import React, { useEffect, useState } from "react";
//import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell,
    Window,
    WindowHeader,
    WindowContent,
    Button,
    Select,
    NumberInput,
    Hourglass,
    ScrollView,
} from "react95";
import { experiences } from "../../constants";

export const ExperienceList = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(delayedMessage, delay);
    }, [isLoading]);

    const delay: number = 300;

    const delayedMessage: () => void = () => {
        console.log("This message is displayed after 4 seconds.");
        setIsLoading(false);
    };

    return (
        <>
            <Window>
                <WindowHeader>Relevant Experience</WindowHeader>
                <WindowContent>
                    <ScrollView style={{ minWidth: 600, height: "410px" }}>
                        {isLoading ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "350px",
                                }}
                            >
                                <Hourglass size={32} />
                            </div>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow key={1}>
                                        {/* <TableHeadCell>{"Id"}</TableHeadCell> */}
                                        <TableHeadCell>{"Title"}</TableHeadCell>
                                        <TableHeadCell>{"Company"}</TableHeadCell>
                                        <TableHeadCell>{"Client"}</TableHeadCell>
                                        <TableHeadCell>{"Tech stack"}</TableHeadCell>
                                        <TableHeadCell>{"Period"}</TableHeadCell>
                                        <TableHeadCell>{"Actions"}</TableHeadCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {experiences.map((exp) =>
                                        <TableRow key={exp.id}>
                                            <TableDataCell key={1}>
                                                {exp.title}
                                            </TableDataCell>
                                            <TableDataCell key={2}>
                                                {exp.company}
                                            </TableDataCell>
                                            <TableDataCell key={3}>
                                                {exp.client}
                                            </TableDataCell>
                                            <TableDataCell key={4}>
                                                {exp.techStack}
                                            </TableDataCell>
                                            <TableDataCell key={6}>
                                                {exp.period}
                                            </TableDataCell>
                                            <TableDataCell key={7}>
                                                <Button onClick={() => {
                                                    window.location.href = `/experience/${exp.id}`;
                                                }}>Open</Button>
                                                <Button disabled onClick={() => { }}>Share</Button>
                                            </TableDataCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}

                    </ScrollView>
                </WindowContent>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 8,
                        marginTop: 8,
                        alignItems: "flex-end",
                    }}
                >
                    <Select<number>
                        disabled
                        style={{ marginLeft: 8 }}
                        //value={getState().pagination.pageSize}
                        onChange={(option) => {
                            //setPageSize(option.value);
                        }}
                        options={pageSizeOptions}
                        defaultValue={10}
                    ></Select>
                    <span style={{ marginLeft: 8 }}>
                        Page{" "}
                        <strong>
                            {/* {getState().pagination.pageIndex + 1} of {pageCount} */}
                        </strong>
                        <span style={{ marginLeft: 8 }}>
                            Go to page:
                            <NumberInput
                                disabled
                                style={{ marginLeft: 8 }}
                                min={1}
                                defaultValue={1}
                                width={130}
                                onChange={(value) => {
                                    const page = value ? Number(value) - 1 : 0;
                                    //setPageIndex(page);
                                }}
                            />
                        </span>
                    </span>
                </div>

            </Window>
        </>
    );
};

const pageSizeOptions = [
    { value: 10, label: "11" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
];

function useNavigation(): { edit: any; } {
    throw new Error("Function not implemented.");
}

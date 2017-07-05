# abc-docs
ABC Software Documentation

## To run
1. Run `yarn` to install the necessary libraries.
2. Run `yarn start`. The server will start on `http://localhost:8080`.

## Documentation structure
You must have the latest ASM DLLs.

The server will look for the documentation in `{your ABC folder}/docs`.

You must have a file called `toc.md` detailing the files to show in the table of contents.

Here is an example of `toc.md`:

```markdown

#### [Lookups](man023)
#### [Macros](man039)
#### [Message screen (.)](man046)
#### [Check Writing](man047)
#### [Inventory Reports](man049)
#### [Purchase Reports](man050)
#### [Sales Reports](man051)
#### [Stock Adjustments](man061)
#### [Labor Billing Rates](man064)
#### [Customers](man067)
#### [Inventory](man073)
#### [Zip Codes](man090)

```

where the URL is the name of the appropriate markdown file, also located in `{your ABC folder}/docs`.

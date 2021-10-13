use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};


#[derive(BorshSerialize, BorshDeserialize, Debug, Hash, Eq, PartialEq)]
pub struct Task {
    /// The public key of the account that is creatng this task
    ///pub account_public_key: Vec<u8>,
    /// A public key to represent the task
    ///pub task_public_key: Vec<u8>,
    /// A user-friendly name of the task
    pub name: String,
    /// Latitude of the task
    pub lat: String,
    /// Longitude of the task
    pub lng: String,
    /// Points the task is worth
    pub points: String,
    /// Description of the task
    pub desc: String,
    /// The public key of the account that is completing the task
    pub completedBy: String,
    pub icon: String,
    pub cateogry: String,
    pub isMultiplayer: String,
    pub company: String,
    pub var1: String,
}


// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Instruction Data
    ) -> ProgramResult {
    msg!("Rust program entrypoint");

    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut request = Task::try_from_slice(_instruction_data)?;
    //request.completedBy = "AvVAd14AQ6hAvMVjJn8WVkc5Mya29xPksgFAaEKGNaba".to_string();
    //request.points = "500".to_string();

    msg!("Request is {}", &request.points);

    //request.points = 500;
    //msg!("And now it is {}", request.points);
    //msg!(&request.points);

    // Increment and store the number of times the account has been greeted
    //let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
    //greeting_account.counter += 1;
    //greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    //msg!(account.data);
    request.serialize(&mut &mut account.data.borrow_mut()[..])?;

    //msg!("Task completed by {}", &request.completedBy);

    Ok(())
}

// Sanity tests
#[cfg(test)]
mod test {
    use super::*;
    use solana_program::clock::Epoch;
    use std::mem;

    #[test]
    fn test_sanity() {
        assert_eq!(2+2,4);
    }
}

﻿// <auto-generated />
using System;
using Car_Auction_Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Car_Auction_Backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241017185344_chnge")]
    partial class chnge
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0-rc.1.24451.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Car_Auction_Backend.Models.Admin", b =>
                {
                    b.Property<int>("AId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AId"));

                    b.Property<string>("AEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("APassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ARole")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Admin");

                    b.Property<string>("AStatus")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Pending");

                    b.Property<bool>("IsMainAdmin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.HasKey("AId");

                    b.ToTable("Admins", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.AuctionHistory", b =>
                {
                    b.Property<int>("HId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("HId"));

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("FinalBidAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Submissions_Id")
                        .HasColumnType("int");

                    b.HasKey("HId");

                    b.HasIndex("Submissions_Id")
                        .IsUnique();

                    b.ToTable("Auction_History", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Bid", b =>
                {
                    b.Property<int>("BidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BidId"));

                    b.Property<int>("AdminId")
                        .HasColumnType("int");

                    b.Property<string>("Bstatus")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Ongoing");

                    b.Property<int>("CarId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("OpeningBid")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.HasKey("BidId");

                    b.HasIndex("AdminId");

                    b.HasIndex("CarId")
                        .IsUnique();

                    b.ToTable("Bids", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Bid_Sub", b =>
                {
                    b.Property<int>("SubId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SubId"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("BSStatus")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Ongoing");

                    b.Property<int>("BidID")
                        .HasColumnType("int");

                    b.Property<decimal>("ReservationPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("SubId");

                    b.HasIndex("BidID");

                    b.HasIndex("UserId");

                    b.ToTable("Bid_subs", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Car", b =>
                {
                    b.Property<int>("CId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CId"));

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CStatus")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Unsold");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("CId");

                    b.ToTable("Cars", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Notification", b =>
                {
                    b.Property<int>("NId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NId"));

                    b.Property<string>("NMessage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserssId")
                        .HasColumnType("int");

                    b.HasKey("NId");

                    b.HasIndex("UserssId");

                    b.ToTable("Notification", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Payment", b =>
                {
                    b.Property<int>("PId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PId"));

                    b.Property<decimal>("PAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("PDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PMethod")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PStatus")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("Pending");

                    b.Property<int>("SubmissionId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("PId");

                    b.HasIndex("SubmissionId")
                        .IsUnique();

                    b.HasIndex("UsersId");

                    b.ToTable("Payment", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.User", b =>
                {
                    b.Property<int>("UId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UId"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("C_Number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailVerificationToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsEmailVerified")
                        .HasColumnType("bit");

                    b.Property<string>("UEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("URole")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("User");

                    b.HasKey("UId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.AuctionHistory", b =>
                {
                    b.HasOne("Car_Auction_Backend.Models.Bid_Sub", "Bid_Sub")
                        .WithOne("AuctionHistory")
                        .HasForeignKey("Car_Auction_Backend.Models.AuctionHistory", "Submissions_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Auction_BidSub");

                    b.Navigation("Bid_Sub");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Bid", b =>
                {
                    b.HasOne("Car_Auction_Backend.Models.Admin", "Admin")
                        .WithMany("Bids")
                        .HasForeignKey("AdminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Bids_Admins");

                    b.HasOne("Car_Auction_Backend.Models.Car", "Car")
                        .WithOne("Bid")
                        .HasForeignKey("Car_Auction_Backend.Models.Bid", "CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Bids_Cars");

                    b.Navigation("Admin");

                    b.Navigation("Car");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Bid_Sub", b =>
                {
                    b.HasOne("Car_Auction_Backend.Models.Bid", "Bid")
                        .WithMany("Bid_Subs")
                        .HasForeignKey("BidID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_BidSub_Bid");

                    b.HasOne("Car_Auction_Backend.Models.User", "User")
                        .WithMany("Bid_Subs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_BidSubs_User");

                    b.Navigation("Bid");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Notification", b =>
                {
                    b.HasOne("Car_Auction_Backend.Models.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserssId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Notification_User");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Payment", b =>
                {
                    b.HasOne("Car_Auction_Backend.Models.Bid_Sub", "Bid_Sub")
                        .WithOne("Payment")
                        .HasForeignKey("Car_Auction_Backend.Models.Payment", "SubmissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Payment_BidSub");

                    b.HasOne("Car_Auction_Backend.Models.User", "User")
                        .WithMany("Payments")
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Payment_Users");

                    b.Navigation("Bid_Sub");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Admin", b =>
                {
                    b.Navigation("Bids");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Bid", b =>
                {
                    b.Navigation("Bid_Subs");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Bid_Sub", b =>
                {
                    b.Navigation("AuctionHistory");

                    b.Navigation("Payment");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.Car", b =>
                {
                    b.Navigation("Bid");
                });

            modelBuilder.Entity("Car_Auction_Backend.Models.User", b =>
                {
                    b.Navigation("Bid_Subs");

                    b.Navigation("Notifications");

                    b.Navigation("Payments");
                });
#pragma warning restore 612, 618
        }
    }
}
